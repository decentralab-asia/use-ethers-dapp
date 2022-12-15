import { UnsupportedChainIdError } from '@web3-react/core'
import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'

import useActiveWeb3React from './useActiveWeb3React'
import { getConnectors } from './connectors'
import { Connector, Status, Wallet } from './types'
import {
  clearLastActiveAccount,
  getLastActiveAccount,
  getLastConnector,
  setLastActiveAccount,
  setLastConnector
} from './utils/storage'
import { ChainUnsupportedError, ConnectorUnsupportedError } from './errors'
import { getWalletProviderFromConnector } from './utils/providers'

export const WalletContext = createContext<Wallet | null>(null)

const useWallet = (): Wallet => {
  const walletContext = useContext(WalletContext)
  if (walletContext == null) {
    throw new Error(
      'useWallet() can only be used inside of <WalletProvider />, ' + 'please declare it at a higher level.'
    )
  }
  return walletContext
}

export function WalletProvider({
  children,
  eagerConnect = false,
  connectors: connectorsInitsOrConfigs
}: {
  children: any
  eagerConnect?: boolean
  connectors: { [key: string]: Connector | {} }
}) {
  const context = useContext(WalletContext)
  if (context != null) {
    throw new Error('<AuthProvider /> has already been declared.')
  }
  const [connector, setConnector] = useState<string | null>(null)
  const [status, setStatus] = useState<Status>('disconnected')
  const [error, setError] = useState<Error | null>(null)
  const activationId = useRef<number>(0)

  const connectors = useMemo(() => getConnectors(connectorsInitsOrConfigs), [connectorsInitsOrConfigs])
  const { account, active, activate, deactivate, error: web3Error, chainId } = useActiveWeb3React()

  const disconnect = useCallback(() => {
    if (active) deactivate && deactivate()
    // localStorage.removeItem('walletconnect')
    clearLastActiveAccount()
    setConnector(null)
    setError(null)
    setStatus('disconnected')
  }, [])

  useEffect(() => {
    if (!eagerConnect) {
      return
    }

    const lastConnector = getLastConnector()
    const lastActiveAccount = getLastActiveAccount()

    if (lastActiveAccount && lastConnector === 'injected') {
      connect('injected')
    }

    //eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (web3Error instanceof UnsupportedChainIdError) {
      setStatus('error')
      setError(new ChainUnsupportedError(web3Error.message))
    }
  }, [web3Error])

  const connect = useCallback(
    async (connectorName: 'injected' | 'walletconnect') => {
      if (!activate) return
      const id = ++activationId.current
      disconnect()
      if (id !== activationId.current) {
        return
      }

      const [connectorInit, connectorConfig] = connectors[connectorName] || []
      const connector = await connectorInit?.()
      const web3ReactConnector = connector?.web3ReactConnector?.({
        ...(connectorConfig || {})
      })

      if (!web3ReactConnector) {
        setStatus('error')
        setError(new ConnectorUnsupportedError(connectorName))
        return
      }
      try {
        setConnector(connectorName)
        await activate(web3ReactConnector, undefined, true)
        setLastConnector(connectorName)
        if (connectorName === 'injected') {
          const account = await web3ReactConnector.getAccount()
          account && setLastActiveAccount(account)
          web3ReactConnector.getProvider().then(provider =>
            provider.on('accountsChanged', (accounts: string[]) => {
              setLastActiveAccount(accounts[0])
            })
          )
        }
        setStatus('connected')
      } catch (err) {
        if (id !== activationId.current) {
          return
        }
        setConnector(null)
        setStatus('error')
        if (err instanceof UnsupportedChainIdError) {
          setError(new ChainUnsupportedError(err.message))
          return
        }
        // It might have thrown with an error known by the connector
        if (connector.handleActivationError) {
          const handledError = connector.handleActivationError(err as Error)
          if (handledError) {
            setError(handledError)
            return
          }
        }
        // Otherwise, set to state the received error
        setError(err as Error)
      }
    },
    [activate, chainId]
  )
  const contextValue = useMemo(() => {
    return {
      account,
      connect,
      disconnect,
      connector,
      error,
      status,
      isConnected: status === 'connected',
      providerInfo: connector ? getWalletProviderFromConnector(connector) : getWalletProviderFromConnector('unknown')
    }
  }, [account, connect, disconnect, connector, error, status])
  return <WalletContext.Provider value={contextValue}>{children}</WalletContext.Provider>
}

export default useWallet

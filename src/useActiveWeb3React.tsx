import { useWeb3React } from '@web3-react/core'
import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { ActiveWeb3React } from './types'

/**
 * Provides a web3 provider with or without user's signer
 * Recreate web3 instance only if the provider change
 */

import { getChainMetadata } from './utils/chains'
import { getSimpleRpcProvider } from './utils/getRpcUrl'
import { setupNetwork } from './utils/wallet'

export const ActiveWeb3ReactContext = createContext<ActiveWeb3React | null>(null)

const useActiveWeb3React = (): ActiveWeb3React => {
  const activeWeb3ReactContext = useContext(ActiveWeb3ReactContext)
  if (activeWeb3ReactContext == null) {
    throw new Error(
      'useActiveWeb3React() can only be used inside of <ActiveWeb3ReactProvider />, ' +
        'please declare it at a higher level.'
    )
  }
  return activeWeb3ReactContext
}

export default useActiveWeb3React

export function ActiveWeb3ReactProvider({
  defaultChainId,
  rpcUrls,
  children
}: {
  defaultChainId: number
  rpcUrls?: string[]
  children: any
}) {
  const context = useContext(ActiveWeb3ReactContext)

  if (context != null) {
    throw new Error('<ActiveWeb3ReactProvider /> has already been declared.')
  }

  const { library, chainId: libChainId, ...web3React } = useWeb3React()
  const chainId = useMemo(() => {
    if (libChainId) return libChainId
    return defaultChainId
  }, [libChainId, defaultChainId])
  const simpleRpcProvider = useMemo(() => getSimpleRpcProvider(chainId), [chainId])
  const refEth = useRef(library)
  const [provider, setProvider] = useState(library || simpleRpcProvider)

  useEffect(() => {
    if (library !== refEth.current) {
      setProvider(library || simpleRpcProvider)
      refEth.current = library
    }
  }, [library, simpleRpcProvider])

  const switchChain = useCallback(async (): Promise<boolean> => {
    if (chainId === defaultChainId) return true
    const provider = library?.provider ? library.provider : library
    if (!provider?.request) return false
    return setupNetwork(defaultChainId, provider, rpcUrls)
  }, [chainId, library])

  const contextValue = useMemo(
    () => ({
      library: provider,
      ...web3React,
      chainId,
      chainInfo: getChainMetadata(chainId, rpcUrls),
      switchChain,
      simpleRpcProvider
    }),
    [provider, chainId, rpcUrls, switchChain, web3React, simpleRpcProvider]
  )
  return <ActiveWeb3ReactContext.Provider value={contextValue}>{children}</ActiveWeb3ReactContext.Provider>
}

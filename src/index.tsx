import { Web3Provider } from '@ethersproject/providers'
import { Web3ReactProvider } from '@web3-react/core'
import React from 'react'
import getNodeUrl from './utils/getRpcUrl'
import useActiveWeb3React, { ActiveWeb3ReactProvider } from './useActiveWeb3React'
import useWallet, { WalletProvider } from './useWallet'
import { useContract, useSimpleContract } from './useContract'
import { useMulticall } from './useMulticall'
import useBalance from './useBalance'
import * as types from './types'

function getLibrary(provider?: any) {
  const library = new Web3Provider(
    provider,
    typeof provider.chainId === 'number'
      ? provider.chainId
      : typeof provider.chainId === 'string'
      ? parseInt(provider.chainId)
      : 'any'
  )
  library.pollingInterval = 5_000
  return library
}

const DappProvider = ({
  children,
  chainId,
  rpcUrls,
  eagerConnect
}: {
  children: any
  chainId: number
  rpcUrls?: string[]
  eagerConnect?: boolean
}): JSX.Element => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <ActiveWeb3ReactProvider defaultChainId={chainId} rpcUrls={rpcUrls}>
        <WalletProvider
          eagerConnect={eagerConnect}
          connectors={{
            injected: {
              //allows you to connect and switch between mainnet and rinkeby within Metamask.
              chainId: [chainId]
            },
            walletconnect: {
              rpc: {
                [chainId]: getNodeUrl(chainId, rpcUrls)
              },
              bridge: 'https://bridge.walletconnect.org',
              pollingInterval: 5_000
            }
          }}
        >
          {children}
        </WalletProvider>
      </ActiveWeb3ReactProvider>
    </Web3ReactProvider>
  )
  // return (
  //   <Web3ReactProvider getLibrary={getLibrary}>
  //     <ActiveWeb3ReactProvider defaultChainId={chainId}>
  //       <AuthProvider>{children}</AuthProvider>
  //     </ActiveWeb3ReactProvider>
  //   </Web3ReactProvider>
  // )
}

export { DappProvider, useWallet, useActiveWeb3React, useContract, useSimpleContract, useMulticall, useBalance, types }

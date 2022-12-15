import { ExternalProvider, Web3Provider } from '@ethersproject/providers'

import { getChainMetadata } from './chains'

export const setupNetwork = async (chainId: number, library?: ExternalProvider, rpcUrls?: string[]) => {
  const chain = getChainMetadata(chainId, rpcUrls)
  if (!library?.request) throw Error('Failed to request')
  try {
    await library.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: chain.chainId }]
    })
    return true
  } catch (switchError) {
    // 4902 error code indicates the chain is missing on the wallet
    if ((switchError as any).code !== 4001) {
      await library.request({
        method: 'wallet_addEthereumChain',
        params: [chain]
      })
      return true
    }
  }
  return false
}

function isUnwrappedRpcResult(
  response: unknown
): response is {
  error?: string
  result?: unknown
} {
  return typeof response === 'object' && response !== null && 'jsonrpc' in response
}

export function rpcResult(response: unknown): unknown | null {
  // Some providers don’t wrap the response
  if (isUnwrappedRpcResult(response)) {
    if (response.error) {
      throw new Error(response.error)
    }
    return response.result || null
  }

  return response || null
}

export const sign = async (from: string, message: string, web3Provider: Web3Provider): Promise<string | undefined> => {
  const signer = web3Provider.getSigner(from)
  return await signer.signMessage(message)
}

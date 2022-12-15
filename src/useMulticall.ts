import { Interface } from '@ethersproject/abi'

import { useCallback } from 'react'
import { getSimpleRpcProvider } from './utils/getRpcUrl'
import { MultiCall } from './types'
import { getMulticallContract } from './utils/contracts'
import useActiveWeb3React from './useActiveWeb3React'

export const useMulticall = async (chainId?: number) => {
  const { chainId: web3ChainId, library, account, simpleRpcProvider } = useActiveWeb3React()
  return useCallback(
    async (abi: any[], calls: MultiCall[]) => {
      if (!web3ChainId) return []
      const multi = getMulticallContract(
        chainId && chainId !== web3ChainId ? chainId : web3ChainId,
        chainId && chainId !== web3ChainId
          ? getSimpleRpcProvider(chainId)
          : account
          ? library.getSigner(account)
          : simpleRpcProvider
      )
      const itf = new Interface(abi)

      const calldata = calls.map(call => ({
        target: call.address.toLowerCase(),
        callData: itf.encodeFunctionData(call.name, call.params)
      }))
      const { returnData } = await multi.aggregate(calldata)

      const res = returnData.map((call: any, i: number) => itf.decodeFunctionResult(calls[i].name, call))

      return res as any[]
    },
    [account, chainId, library, simpleRpcProvider, web3ChainId]
  )
}

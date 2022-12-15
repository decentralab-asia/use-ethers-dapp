// Imports below migrated from Exchange useContract.ts
import { Contract } from '@ethersproject/contracts'
import { Web3Provider } from '@ethersproject/providers'

import { useMemo } from 'react'

import useActiveWeb3React from './useActiveWeb3React'
import { ContractInfo, getContract, getProviderOrSigner } from './utils/contracts'
import { getSimpleRpcProvider } from './utils/getRpcUrl'
import { WalletProviderError } from './errors'

export function useSimpleContract<T extends Contract = Contract>({
  contract,
  chainId
}: {
  contract: ContractInfo
  chainId: number
}): T {
  return useMemo(() => {
    return getContract(contract, getSimpleRpcProvider(chainId))
  }, [contract, chainId]) as T
}

// returns null on errors
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function useContract<T extends Contract = Contract>({
  contract,
  withSignerIfPossible = true,
  account,
  library
}: {
  contract: ContractInfo
  withSignerIfPossible?: boolean
  account?: string
  library?: Web3Provider
}): T {
  const { library: activeLibrary, account: activeAccount, chainId, simpleRpcProvider } = useActiveWeb3React()

  return useMemo(() => {
    const providerOrSigner = withSignerIfPossible
      ? getProviderOrSigner(library ?? (activeLibrary as Web3Provider), account ?? activeAccount)
      : simpleRpcProvider
    if (!providerOrSigner) throw new WalletProviderError('Unable to get provider')
    return getContract(contract, providerOrSigner)
  }, [contract, chainId, withSignerIfPossible, library, activeLibrary, account, activeAccount, simpleRpcProvider]) as T
}

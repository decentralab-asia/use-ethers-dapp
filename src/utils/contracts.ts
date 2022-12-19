import { Result } from '@ethersproject/abi'
import { TransactionReceipt } from '@ethersproject/abstract-provider'
import { Signer } from '@ethersproject/abstract-signer'
import { getAddress } from '@ethersproject/address'
import { AddressZero } from '@ethersproject/constants'
// Imports below migrated from Exchange useContract.ts
import { Contract } from '@ethersproject/contracts'
import { Provider, Web3Provider } from '@ethersproject/providers'
import { ContractInfo } from '../types'
import MULTICALL_ABI from '../abis/Multicall'

import { BSC_MAINNET, BSC_TESTNET, GOERLI, MUMBAI_TESTNET, POLYGON_MAINNET } from './chains'

export function isAddress(value: any): string | false {
  try {
    return getAddress(value)
  } catch {
    return false
  }
}

// account is not optional
export function getSigner(library: Web3Provider, account: string): Signer {
  return library.getSigner(account).connectUnchecked()
}

// account is optional
export function getProviderOrSigner(library: Web3Provider, account?: string | null): Provider | Signer {
  return account ? getSigner(library, account) : library
}

// account is optional
export function getContract(contract: ContractInfo, signer: Signer | Provider): Contract {
  const { address, abi } = contract
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`)
  }

  return new Contract(address, abi, signer)
}

const getMulticallAddress = (chainId: number): string => {
  switch (chainId) {
    case POLYGON_MAINNET:
      return '0x11ce4B23bD875D7F5C6a31084f55fDe1e9A87507'
    case BSC_MAINNET:
      return '0x41263cba59eb80dc200f3e2544eda4ed6a90e76c'
    case GOERLI:
      return '0x77dca2c955b15e9de4dbbcf1246b4b85b651e50e'
    case BSC_TESTNET:
      return '0x6e5BB1a5Ad6F68A8D7D6A5e47750eC15773d6042'
    case MUMBAI_TESTNET:
      return '0x08411ADd0b5AA8ee47563b146743C13b3556c9Cc'
    default:
      return '0xeefba1e63905ef1d7acba5a8513c70307c1ce441'
  }
}

export const getMulticallContract = (chainId: number, provider: Signer | Provider) => {
  return getContract({ address: getMulticallAddress(chainId), abi: MULTICALL_ABI }, provider)
}

export const getResultFromReceipt = (receipt: TransactionReceipt, contract: Contract): Result | null => {
  const log = receipt.logs.find(e => e.address === contract.address && e.transactionHash === receipt.transactionHash)
  if (!log) return null

  const data = contract.interface.parseLog(log)
  if (!data?.args.length) return null
  return data.args
}

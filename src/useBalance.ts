import ERC20_ABI from './abis/ERC20'
import { BigNumber } from '@ethersproject/bignumber'
import { formatUnits } from '@ethersproject/units'
import { useEffect, useState } from 'react'
import { useMulticall } from './useMulticall'
import useActiveWeb3React from './useActiveWeb3React'

import { pollEvery } from './utils/pollEvery'

interface Balance {
  [key: string]: number | undefined
}

interface BalanceResult {
  asset: string
  balance: number | undefined
}

export const useBalance = ({
  tokenAddresses,
  pollingDuration = 30000
}: {
  tokenAddresses?: string[]
  pollingDuration?: number
}) => {
  const [balances, setBalances] = useState<Balance>({})
  const { account, library } = useActiveWeb3React()
  const multicall = useMulticall()

  useEffect(() => {
    // console.log('go again')
    let cancel = false
    const getBalanceNative = async (): Promise<BalanceResult> => {
      const data = await library?.getBalance(account)
      return { asset: '$NATIVE', balance: data ? Number(formatUnits(data as BigNumber, 18)) : undefined }
    }
    const getTokenBalances = async (_tokenAddresses: string[]): Promise<BalanceResult[]> => {
      const balanceCalls = _tokenAddresses.map(address => ({
        address,
        name: 'balanceOf',
        params: [account]
      }))
      const decimalCalls = _tokenAddresses.map(address => ({
        address,
        name: 'decimals',
        params: [account]
      }))
      return (await multicall)(ERC20_ABI, [...balanceCalls, ...decimalCalls]).then(values => {
        const balanceValues: BigNumber[] = values.slice(0, _tokenAddresses.length)
        const decimalValues: BigNumber[] = values.slice(-_tokenAddresses.length)
        return _tokenAddresses.map((address, i) => ({
          asset: address,
          balance: Number(formatUnits(balanceValues[i], decimalValues[i].toNumber()))
        }))
      })
    }
    // Poll wallet balance
    const pollBalance = pollEvery((onUpdate: (balance: Balance) => void) => {
      return {
        async request() {
          if (!account) return
          if (!tokenAddresses) return [await getBalanceNative()]
          return [await getBalanceNative(), ...(await getTokenBalances(tokenAddresses))]
        },
        onResult(results?: BalanceResult[]) {
          if (cancel || !results) return
          onUpdate(
            results.reduce((prev, cur) => {
              prev[cur.asset] = cur.balance
              return prev
            }, {} as Balance)
          )
        }
      }
    }, pollingDuration)

    // start polling balance every x time
    const stopPollingBalance = pollBalance(setBalances)

    return () => {
      cancel = true
      stopPollingBalance()
      setBalances({})
    }
  }, [account, setBalances, library])
  return balances
}

export default useBalance

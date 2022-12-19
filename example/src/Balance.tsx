import React, { useCallback, useState } from 'react'
import { useContract } from 'use-ethers-dapp'
import { USDT } from 'utils'
import USDT_ABI from 'USDT.json'
import { useTransactionListnener, ConfirmationInfo } from 'use-ethers-dapp'

const Balance = ({ balances }: { balances: { [key: string]: number | undefined } }) => {
  const usdtContract = useContract({ contract: { address: USDT, abi: USDT_ABI } })
  const [submitting, setSubmitting] = useState(false)
  const [ongoingTx, setOngoingTx] = useState<ConfirmationInfo | undefined>(undefined)
  const { subscribe } = useTransactionListnener()
  const mint = useCallback(async () => {
    try {
      setOngoingTx(undefined)
      setSubmitting(true)
      const { hash } = await usdtContract.mint()
      const result = await subscribe(hash, 3, info => setOngoingTx(info))
      if (result?.status != 0) alert('Success!')
      setOngoingTx(undefined)
      setSubmitting(false)
      // console.log(result)
    } catch (err) {
      alert(err.error?.message)
    }
  }, [usdtContract])
  return (
    <div>
      <div>Balance ETH: {balances.$NATIVE}</div>
      {ongoingTx ? (
        <div>
          Tx: <a href={ongoingTx.txLink}>{ongoingTx.txHash}</a> Confirmations: {ongoingTx.confirmations}/3
        </div>
      ) : (
        <div>
          Balance USDT: {balances[USDT]}{' '}
          <button onClick={mint} disabled={submitting}>
            Mint
          </button>
        </div>
      )}
    </div>
  )
}

export default Balance

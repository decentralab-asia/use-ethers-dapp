import React from 'react'
import { useBalance } from 'use-ethers-dapp'

const Balance = ({ balances }: { balances: { [key: string]: number | undefined } }) => {
  return <div>Balance: {balances.$NATIVE}</div>
}

export default Balance

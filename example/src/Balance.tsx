import React from 'react'

const Balance = ({ balances }: { balances: { [key: string]: number | undefined } }) => {
  return <div>Balance: {balances.$NATIVE}</div>
}

export default Balance

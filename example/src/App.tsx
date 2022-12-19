import Balance from 'Balance'
import { USDT } from 'utils'
import { useState } from 'react'
import { useBalance, useWallet } from 'use-ethers-dapp'

function App() {
  const [count, setCount] = useState(0)
  const { isConnected, account, connect, disconnect, error } = useWallet()
  const balances = useBalance({
    tokenAddresses: [USDT]
  })

  if (error) return <div>Error: {error.message}</div>

  return !isConnected ? (
    <div>
      <button onClick={() => connect('injected')}>Connect Metamask</button>
      <button onClick={() => connect('walletconnect')}>Connect Wallect Connect</button>
    </div>
  ) : (
    <div>
      {account}
      <button onClick={disconnect}>Disconnect</button>
      <div>
        <Balance balances={balances} />
      </div>
    </div>
  )
}

export default App

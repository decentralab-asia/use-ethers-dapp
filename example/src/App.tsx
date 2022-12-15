import { useState } from 'react'

import { useWallet } from 'use-ethers-dapp'

function App() {
  const [count, setCount] = useState(0)
  const { isConnected, account, connect, disconnect, error } = useWallet()

  console.log('error', error?.message)

  return !isConnected ? (
    <div>
      <button onClick={() => connect('walletconnect')}>Connect</button>
    </div>
  ) : (
    <div>
      {account}
      <button onClick={disconnect}>Disconnect</button>
    </div>
  )
}

export default App

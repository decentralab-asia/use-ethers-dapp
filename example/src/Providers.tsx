import React, { ReactNode } from 'react'
import { DappProvider } from 'use-ethers-dapp'

const Providers = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  return <DappProvider chainId={5}>{children}</DappProvider>
}

export default Providers

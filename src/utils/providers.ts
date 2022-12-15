import { WalletInfo } from 'types'

declare global {
  interface Window {
    ethereum: any
  }
}

function isElectron() {
  // See https://github.com/electron/electron/issues/2288
  return (
    typeof navigator === 'object' &&
    typeof navigator.userAgent === 'string' &&
    navigator.userAgent.indexOf('Electron') >= 0
  )
}

export const SUPPORTED_WALLETS: { [key: string]: WalletInfo } = {
  METAMASK: {
    connectorName: 'injected',
    name: 'Metamask',
    description: 'Easy-to-use browser extension.',
    href: null,
    color: '#E8831D'
  },
  WALLET_CONNECT: {
    connectorName: 'walletconnect',
    name: 'Wallet Connect',
    description: 'Connect to Trust Wallet, Rainbow Wallet and more...',
    href: null,
    color: '#4196FC',
    mobile: true
  }
}

function getWalletProvider(providerId: string): WalletInfo | undefined {
  return SUPPORTED_WALLETS[providerId]
}

function identifyWalletProvider(provider: any) {
  if (provider && isElectron()) {
    return 'frame'
  }
  if (provider && provider.isMetaMask) {
    return 'metamask'
  }
  return 'unknown'
}

function getWalletProviderFromConnector(id: string) {
  if (id === 'injected') {
    return getWalletProvider(identifyWalletProvider(window.ethereum)) || getWalletProvider('unknown')
  }
  return getWalletProvider(id) || getWalletProvider('unknown')
}

export { getWalletProvider, identifyWalletProvider, getWalletProviderFromConnector }

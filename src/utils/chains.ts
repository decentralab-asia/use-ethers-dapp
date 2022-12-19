import { Chain, NativeCurrency } from 'types'

const ETHEREUM = 1
const BSC_MAINNET = 56
const POLYGON_MAINNET = 137
const GOERLI = 5
const BSC_TESTNET = 97
const MUMBAI_TESTNET = 80001

const NATIVE_CURRENCIES: { [key: string]: NativeCurrency } = {
  ETH: {
    name: 'ETH',
    symbol: 'ETH',
    decimals: 18
  },
  MATIC: {
    name: 'MATIC',
    symbol: 'MATIC',
    decimals: 18
  },
  BNB: {
    name: 'BNB',
    symbol: 'BNB',
    decimals: 18
  }
}

const CHAINS: { [key: number]: Chain } = {
  [ETHEREUM]: {
    chainId: `0x${ETHEREUM.toString(16)}`,
    chainName: 'Ethereum Mainnet',
    nativeCurrency: NATIVE_CURRENCIES.ETH,
    rpcUrls: ['https://eth-rpc.gateway.pokt.network'],
    blockExplorerUrls: ['https://etherscan.io']
  },
  [POLYGON_MAINNET]: {
    chainId: `0x${POLYGON_MAINNET.toString(16)}`,
    chainName: 'Polygon Mainnet',
    nativeCurrency: NATIVE_CURRENCIES.MATIC,
    rpcUrls: ['https://polygon-rpc.com'],
    blockExplorerUrls: ['https://polygonscan.com']
  },
  [BSC_MAINNET]: {
    chainId: `0x${BSC_MAINNET.toString(16)}`,
    chainName: 'Binance Smart Chain Mainnet',
    nativeCurrency: NATIVE_CURRENCIES.BNB,
    rpcUrls: [
      'https://bsc-dataseed.binance.org',
      'https://bsc-dataseed1.defibit.io',
      'https://bsc-dataseed1.ninicoin.io',
      'https://bsc-dataseed2.defibit.io',
      'https://bsc-dataseed3.defibit.io',
      'https://bsc-dataseed4.defibit.io',
      'https://bsc-dataseed2.ninicoin.io',
      'https://bsc-dataseed3.ninicoin.io',
      'https://bsc-dataseed4.ninicoin.io',
      'https://bsc-dataseed1.binance.org',
      'https://bsc-dataseed2.binance.org',
      'https://bsc-dataseed3.binance.org',
      'https://bsc-dataseed4.binance.org'
    ],
    blockExplorerUrls: ['https://bscscan.com']
  },
  [GOERLI]: {
    chainId: `0x${GOERLI.toString(16)}`,
    chainName: 'Goerli Testnet',
    nativeCurrency: NATIVE_CURRENCIES.ETH,
    rpcUrls: ['https://rpc.ankr.com/eth_goerli'],
    blockExplorerUrls: ['https://goerli.etherscan.io']
  },
  [MUMBAI_TESTNET]: {
    chainId: `0x${MUMBAI_TESTNET.toString(16)}`,
    chainName: 'Mumbai',
    nativeCurrency: NATIVE_CURRENCIES.MATIC,
    rpcUrls: ['https://rpc-mumbai.maticvigil.com'],
    blockExplorerUrls: ['https://mumbai.polygonscan.com']
  },
  [BSC_TESTNET]: {
    chainId: `0x${BSC_TESTNET.toString(16)}`,
    chainName: 'Binance Smart Chain Testnet',
    nativeCurrency: {
      name: 'tBNB',
      symbol: 'tBNB',
      decimals: 18
    },
    rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545'],
    blockExplorerUrls: ['https://testnet.bscscan.com']
  }
}

const getChainMetadata = (chainId: number, rpcUrls?: string[]) => {
  const chain = CHAINS[chainId]
  if (!chain) throw Error('Unknown chainId')
  if (rpcUrls) return { ...chain, rpcUrls }
  return chain
}

export {
  ETHEREUM,
  BSC_MAINNET,
  POLYGON_MAINNET,
  GOERLI,
  BSC_TESTNET,
  MUMBAI_TESTNET,
  NATIVE_CURRENCIES,
  CHAINS,
  getChainMetadata
}

export const ETHEREUM = 1;
export const BSC_MAINNET = 56;
export const POLYGON_MAINNET = 137;
export const GOERLI = 5;
export const BSC_TESTNET = 97;
export const MUMBAI_TESTNET = 80001;

export interface NativeCurrency {
  name: string;
  symbol: string;
  decimals: number;
}
export interface Chain {
  chainId: string;
  chainName: string;
  nativeCurrency: NativeCurrency;
  rpcUrls: string[];
  blockExplorerUrls: string[];
}

export const NATIVE_CURRENCIES: { [key: string]: NativeCurrency } = {
  ETH: {
    name: "ETH",
    symbol: "ETH",
    decimals: 18,
  },
  MATIC: {
    name: "MATIC",
    symbol: "MATIC",
    decimals: 18,
  },
  BNB: {
    name: "BNB",
    symbol: "BNB",
    decimals: 18,
  },
};

export const CHAINS: { [key: number]: Chain } = {
  [ETHEREUM]: {
    chainId: `0x${ETHEREUM.toString(16)}`,
    chainName: "Ethereum Mainnet",
    nativeCurrency: NATIVE_CURRENCIES.ETH,
    rpcUrls: [
      "https://eth-mainnet.g.alchemy.com/v2/8ABROOCwIIuiAAXYO5YsZAIlx204ESIl/",
    ],
    blockExplorerUrls: ["https://etherscan.io"],
  },
  [POLYGON_MAINNET]: {
    chainId: `0x${POLYGON_MAINNET.toString(16)}`,
    chainName: "Polygon Mainnet",
    nativeCurrency: NATIVE_CURRENCIES.MATIC,
    rpcUrls: ["https://polygon-rpc.com"],
    blockExplorerUrls: ["https://polygonscan.com"],
  },
  [BSC_MAINNET]: {
    chainId: `0x${BSC_MAINNET.toString(16)}`,
    chainName: "Binance Smart Chain Mainnet",
    nativeCurrency: NATIVE_CURRENCIES.BNB,
    rpcUrls: [
      "https://bsc-dataseed.binance.org",
      "https://bsc-dataseed1.defibit.io",
      "https://bsc-dataseed1.ninicoin.io",
      "https://bsc-dataseed2.defibit.io",
      "https://bsc-dataseed3.defibit.io",
      "https://bsc-dataseed4.defibit.io",
      "https://bsc-dataseed2.ninicoin.io",
      "https://bsc-dataseed3.ninicoin.io",
      "https://bsc-dataseed4.ninicoin.io",
      "https://bsc-dataseed1.binance.org",
      "https://bsc-dataseed2.binance.org",
      "https://bsc-dataseed3.binance.org",
      "https://bsc-dataseed4.binance.org",
    ],
    blockExplorerUrls: ["https://bscscan.com"],
  },
  [GOERLI]: {
    chainId: `0x${GOERLI.toString(16)}`,
    chainName: "Goerli Testnet",
    nativeCurrency: NATIVE_CURRENCIES.ETH,
    rpcUrls: [
      "https://eth-goerli.g.alchemy.com/v2/k4UdW1QHoVrD2PmC-5rBHAzdKgMaetYQ/",
    ],
    blockExplorerUrls: ["https://goerli.etherscan.io"],
  },
  [MUMBAI_TESTNET]: {
    chainId: `0x${MUMBAI_TESTNET.toString(16)}`,
    chainName: "Mumbai",
    nativeCurrency: NATIVE_CURRENCIES.MATIC,
    rpcUrls: ["https://rpc-mumbai.maticvigil.com"],
    blockExplorerUrls: ["https://mumbai.polygonscan.com"],
  },
  [BSC_TESTNET]: {
    chainId: `0x${BSC_TESTNET.toString(16)}`,
    chainName: "Binance Smart Chain Testnet",
    nativeCurrency: {
      name: "tBNB",
      symbol: "tBNB",
      decimals: 18,
    },
    rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545/"],
    blockExplorerUrls: ["https://testnet.bscscan.com"],
  },
};

export const getChainMetadata = (chainId: number) => {
  if (!CHAINS[chainId]) throw Error("Unknown chainId");
  return CHAINS[chainId];
};
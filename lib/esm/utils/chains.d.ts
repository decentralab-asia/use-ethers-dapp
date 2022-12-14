export declare const ETHEREUM = 1;
export declare const BSC_MAINNET = 56;
export declare const POLYGON_MAINNET = 137;
export declare const GOERLI = 5;
export declare const BSC_TESTNET = 97;
export declare const MUMBAI_TESTNET = 80001;
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
export declare const NATIVE_CURRENCIES: {
    [key: string]: NativeCurrency;
};
export declare const CHAINS: {
    [key: number]: Chain;
};
export declare const getChainMetadata: (chainId: number) => Chain;

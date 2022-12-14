import { ExternalProvider, Web3Provider } from "@ethersproject/providers";
export declare const setupNetwork: (chainId: number, library?: ExternalProvider) => Promise<boolean>;
export declare function rpcResult(response: unknown): unknown | null;
export declare const sign: (from: string, message: string, web3Provider: Web3Provider) => Promise<string | undefined>;

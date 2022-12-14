import { StaticJsonRpcProvider } from "@ethersproject/providers";
declare const getNodeUrl: (chainId: number) => string;
export declare const getSimpleRpcProvider: (chainId: number) => StaticJsonRpcProvider;
export default getNodeUrl;

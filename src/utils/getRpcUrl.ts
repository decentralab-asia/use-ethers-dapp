import { StaticJsonRpcProvider } from "@ethersproject/providers";
import sample from "lodash/sample";

import { getChainMetadata } from "./chains";

const getNodeUrl = (chainId: number) => {
  // Use custom node if available (both for development and production)
  // However on the testnet it wouldn't work, so if on testnet - comment out the REACT_APP_NODE_PRODUCTION from env file
  // if (import.meta.env.VITE_NODE_PRODUCTION) {
  //   return import.meta.env.VITE_NODE_PRODUCTION
  // }
  const chainInfo = getChainMetadata(chainId);
  return sample(chainInfo.rpcUrls) ?? "";
};

export const getSimpleRpcProvider = (chainId: number) =>
  new StaticJsonRpcProvider(getNodeUrl(chainId));

export default getNodeUrl;

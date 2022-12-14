import { StaticJsonRpcProvider } from "@ethersproject/providers";
import sample from "lodash/sample";
import { getChainMetadata } from "./chains";
var getNodeUrl = function (chainId) {
    var _a;
    // Use custom node if available (both for development and production)
    // However on the testnet it wouldn't work, so if on testnet - comment out the REACT_APP_NODE_PRODUCTION from env file
    // if (import.meta.env.VITE_NODE_PRODUCTION) {
    //   return import.meta.env.VITE_NODE_PRODUCTION
    // }
    var chainInfo = getChainMetadata(chainId);
    return (_a = sample(chainInfo.rpcUrls)) !== null && _a !== void 0 ? _a : "";
};
export var getSimpleRpcProvider = function (chainId) {
    return new StaticJsonRpcProvider(getNodeUrl(chainId));
};
export default getNodeUrl;

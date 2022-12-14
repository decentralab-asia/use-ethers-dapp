import React from "react";
import { ActiveWeb3ReactProvider } from "useActiveWeb3React";
import { AuthProvider } from "useAuth";
var DappProvider = function (_a) {
    var children = _a.children, chainId = _a.chainId;
    return (React.createElement(ActiveWeb3ReactProvider, { defaultChainId: chainId },
        React.createElement(AuthProvider, null, children)));
};
export default DappProvider;

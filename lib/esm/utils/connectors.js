import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import getNodeUrl from "utils/getRpcUrl";
export var SUPPORTED_WALLETS = {
    METAMASK: {
        connectorName: "injected",
        name: "Metamask",
        description: "Easy-to-use browser extension.",
        href: null,
        color: "#E8831D",
    },
    WALLET_CONNECT: {
        connectorName: "walletconnect",
        name: "Wallet Connect",
        description: "Connect to Trust Wallet, Rainbow Wallet and more...",
        href: null,
        color: "#4196FC",
        mobile: true,
    },
};
export var getConnector = function (connectorName, chainId) {
    var _a;
    switch (connectorName) {
        case "walletconnect":
            return new WalletConnectConnector({
                supportedChainIds: [chainId],
                rpc: (_a = {},
                    _a[chainId] = getNodeUrl(chainId),
                    _a),
                qrcode: true,
            });
        default:
            return new InjectedConnector({
                supportedChainIds: [chainId],
            });
    }
};

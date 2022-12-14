import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

import getNodeUrl from "utils/getRpcUrl";

export type ConnectorName = "injected" | "walletconnect";

interface WalletInfo {
  connectorName: ConnectorName;
  name: string;
  description: string;
  href: string | null;
  color: string;
  primary?: true;
  mobile?: true;
  mobileOnly?: true;
}

export const SUPPORTED_WALLETS: { [key: string]: WalletInfo } = {
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

export const getConnector = (connectorName: ConnectorName, chainId: number) => {
  switch (connectorName) {
    case "walletconnect":
      return new WalletConnectConnector({
        supportedChainIds: [chainId],
        rpc: {
          [chainId]: getNodeUrl(chainId),
        },
        qrcode: true,
      });
    default:
      return new InjectedConnector({
        supportedChainIds: [chainId],
      });
  }
};

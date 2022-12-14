import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
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
export declare const SUPPORTED_WALLETS: {
    [key: string]: WalletInfo;
};
export declare const getConnector: (connectorName: ConnectorName, chainId: number) => InjectedConnector | WalletConnectConnector;
export {};

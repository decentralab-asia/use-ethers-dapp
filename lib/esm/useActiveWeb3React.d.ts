import { StaticJsonRpcProvider } from "@ethersproject/providers";
import { AbstractConnector } from "@web3-react/abstract-connector";
import React from "react";
/**
 * Provides a web3 provider with or without user's signer
 * Recreate web3 instance only if the provider change
 */
import { Chain } from "utils/chains";
export declare const ActiveWeb3ReactContext: React.Context<any>;
export declare function ActiveWeb3ReactProvider({ defaultChainId, children, renderLoading, }: {
    defaultChainId: number;
    children: JSX.Element;
    renderLoading?: () => JSX.Element;
}): JSX.Element;
declare const useActiveWeb3React: () => {
    connector?: AbstractConnector | undefined;
    account?: string | null | undefined;
    active: boolean;
    error?: Error | undefined;
    library: any;
    chainId: number;
    activate: (connector: AbstractConnector, onError?: ((error: Error) => void) | undefined, throwErrors?: boolean | undefined) => Promise<any>;
    setError: (error: Error) => void;
    deactivate: () => void;
    switchChain: (chain: Chain) => Promise<boolean>;
    simpleRpcProvider: StaticJsonRpcProvider;
};
export default useActiveWeb3React;

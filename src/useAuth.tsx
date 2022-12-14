import { UnsupportedChainIdError } from "@web3-react/core";
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from "@web3-react/injected-connector";
import {
  UserRejectedRequestError as UserRejectedRequestErrorWalletConnect,
  WalletConnectConnector,
} from "@web3-react/walletconnect-connector";
import React, { createContext, useCallback, useContext, useMemo } from "react";

import { getChainMetadata } from "utils/chains";
import { ConnectorName, getConnector } from "utils/connectors";
import { CONNECTOR_STORAGE_KEY } from "utils/constants";
import { setupNetwork } from "utils/wallet";
import useActiveWeb3React from "./useActiveWeb3React";

export const AuthContext = createContext({} as any);

export function AuthProvider({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) {
  const { account, activate, deactivate, setError, chainId } =
    useActiveWeb3React();

  const onActiveWalletError = useCallback(
    (connector) => async (error: Error) => {
      if (error instanceof UnsupportedChainIdError) {
        setError(error);
      } else {
        if (error instanceof NoEthereumProviderError) {
          throw Error("No provider was found");
        }
        if (
          error instanceof UserRejectedRequestErrorInjected ||
          error instanceof UserRejectedRequestErrorWalletConnect
        ) {
          if (connector instanceof WalletConnectConnector) {
            const walletConnector = connector as WalletConnectConnector;
            walletConnector.walletConnectProvider = undefined;
          }
          throw Error("Please authorize to access your account");
        }
        throw error;
      }
    },
    [setError]
  );

  const connect = useCallback(
    async (_connectorName?: "injected" | "walletconnect") => {
      const connectorName =
        _connectorName ??
        (localStorage.getItem(CONNECTOR_STORAGE_KEY) as ConnectorName);
      if (!connectorName) return;
      const connector = getConnector(_connectorName ?? connectorName, chainId);
      if (!connector) return;
      await activate(connector, onActiveWalletError(connector));
      const provider = await connector.getProvider();
      if (!provider) return;
      window?.localStorage?.setItem(CONNECTOR_STORAGE_KEY, connectorName);
      try {
        await setupNetwork(chainId, provider);
      } catch (err) {
        throw Error(`Can't switch to ${getChainMetadata(chainId).chainName}`);
      }
    },
    [activate, chainId, onActiveWalletError]
  );

  const disconnect = useCallback(() => {
    deactivate();
    localStorage.removeItem("walletconnect");
    window?.localStorage?.removeItem(CONNECTOR_STORAGE_KEY);
  }, [deactivate]);

  const contextValue = useMemo(() => {
    return {
      account,
      connect,
      disconnect,
    };
  }, [account, connect, disconnect]);
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);

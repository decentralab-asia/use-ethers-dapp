import { StaticJsonRpcProvider, Web3Provider } from "@ethersproject/providers";
import { AbstractConnector } from "@web3-react/abstract-connector";
import { useWeb3React, Web3ReactProvider } from "@web3-react/core";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

/**
 * Provides a web3 provider with or without user's signer
 * Recreate web3 instance only if the provider change
 */

import { Chain } from "utils/chains";
import { getSimpleRpcProvider } from "utils/getRpcUrl";
import { setupNetwork } from "utils/wallet";

function getLibrary(provider?: any) {
  const library = new Web3Provider(
    provider,
    typeof provider.chainId === "number"
      ? provider.chainId
      : typeof provider.chainId === "string"
      ? parseInt(provider.chainId)
      : "any"
  );
  library.pollingInterval = 5_000;
  return library;
}

export const ActiveWeb3ReactContext = createContext({} as any);

export function ActiveWeb3ReactProvider({
  defaultChainId,
  children,
  renderLoading,
}: {
  defaultChainId: number;
  children: JSX.Element;
  renderLoading?: () => JSX.Element;
}) {
  const { library, chainId: libChainId, ...web3React } = useWeb3React();
  const chainId = useMemo(() => {
    if (libChainId) return libChainId;
    return defaultChainId;
  }, [libChainId, defaultChainId]);
  const simpleRpcProvider = useMemo(
    () => getSimpleRpcProvider(chainId),
    [chainId]
  );
  const refEth = useRef(library);
  const [provider, setProvider] = useState(library || simpleRpcProvider);

  useEffect(() => {
    if (library !== refEth.current) {
      setProvider(library || simpleRpcProvider);
      refEth.current = library;
    }
  }, [library, simpleRpcProvider]);

  const switchChain = useCallback(
    async (_chainId: number): Promise<boolean> => {
      if (chainId === _chainId) return true;
      const provider = library?.provider ? library.provider : library;
      if (!provider?.request) return false;
      return setupNetwork(_chainId, provider);
    },
    [chainId, library]
  );

  const contextValue = useMemo(
    () => ({
      library: provider,
      ...web3React,
      chainId,
      switchChain,
      simpleRpcProvider,
    }),
    [provider, chainId, switchChain, web3React, simpleRpcProvider]
  );
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <ActiveWeb3ReactContext.Provider value={contextValue}>
        {chainId ? children : renderLoading ? renderLoading() : "Loading..."}
      </ActiveWeb3ReactContext.Provider>
    </Web3ReactProvider>
  );
}

const useActiveWeb3React = () =>
  useContext(ActiveWeb3ReactContext) as {
    connector?: AbstractConnector;
    account?: null | string;
    active: boolean;
    error?: Error;
    library: any;
    chainId: number;
    activate: (
      connector: AbstractConnector,
      onError?: ((error: Error) => void) | undefined,
      throwErrors?: boolean | undefined
    ) => Promise<any>;
    setError: (error: Error) => void;
    deactivate: () => void;
    switchChain: (chain: Chain) => Promise<boolean>;
    simpleRpcProvider: StaticJsonRpcProvider;
  };

export default useActiveWeb3React;

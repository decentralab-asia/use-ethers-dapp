import React from "react";
import { ActiveWeb3ReactProvider } from "useActiveWeb3React";
import { AuthProvider } from "useAuth";

const DappProvider = ({
  children,
  chainId,
}: {
  children: JSX.Element | JSX.Element[];
  chainId: number;
}): JSX.Element => (
  <ActiveWeb3ReactProvider defaultChainId={chainId}>
    <AuthProvider>{children}</AuthProvider>
  </ActiveWeb3ReactProvider>
);

export default DappProvider;

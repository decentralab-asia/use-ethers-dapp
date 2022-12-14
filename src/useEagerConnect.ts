import { useEffect } from "react";

import { useAuthContext } from "useAuth";
import { ConnectorName } from "utils/connectors";
import { CONNECTOR_STORAGE_KEY } from "utils/constants";

const useEagerConnect = () => {
  const { connect } = useAuthContext();
  useEffect(() => {
    const tryLogin = (connectorName: ConnectorName) => {
      setTimeout(() => connect(connectorName));
    };
    const connectorName = window?.localStorage?.getItem(CONNECTOR_STORAGE_KEY);
    if (connectorName !== "injected" && connectorName !== "walletconnect")
      return;
    tryLogin(connectorName);
  }, []);
};

export default useEagerConnect;

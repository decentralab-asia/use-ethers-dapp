import { useEffect } from "react";
import { useAuthContext } from "useAuth";
import { CONNECTOR_STORAGE_KEY } from "utils/constants";
var useEagerConnect = function () {
    var connect = useAuthContext().connect;
    useEffect(function () {
        var _a;
        var tryLogin = function (connectorName) {
            setTimeout(function () { return connect(connectorName); });
        };
        var connectorName = (_a = window === null || window === void 0 ? void 0 : window.localStorage) === null || _a === void 0 ? void 0 : _a.getItem(CONNECTOR_STORAGE_KEY);
        if (connectorName !== "injected" && connectorName !== "walletconnect")
            return;
        tryLogin(connectorName);
    }, []);
};
export default useEagerConnect;

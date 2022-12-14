var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { UnsupportedChainIdError } from "@web3-react/core";
import { NoEthereumProviderError, UserRejectedRequestError as UserRejectedRequestErrorInjected, } from "@web3-react/injected-connector";
import { UserRejectedRequestError as UserRejectedRequestErrorWalletConnect, WalletConnectConnector, } from "@web3-react/walletconnect-connector";
import React, { createContext, useCallback, useContext, useMemo } from "react";
import { getChainMetadata } from "utils/chains";
import { getConnector } from "utils/connectors";
import { CONNECTOR_STORAGE_KEY } from "utils/constants";
import { setupNetwork } from "utils/wallet";
import useActiveWeb3React from "./useActiveWeb3React";
export var AuthContext = createContext({});
export function AuthProvider(_a) {
    var _this = this;
    var children = _a.children;
    var _b = useActiveWeb3React(), account = _b.account, activate = _b.activate, deactivate = _b.deactivate, setError = _b.setError, chainId = _b.chainId;
    var onActiveWalletError = useCallback(function (connector) { return function (error) { return __awaiter(_this, void 0, void 0, function () {
        var walletConnector;
        return __generator(this, function (_a) {
            if (error instanceof UnsupportedChainIdError) {
                setError(error);
            }
            else {
                if (error instanceof NoEthereumProviderError) {
                    throw Error("No provider was found");
                }
                if (error instanceof UserRejectedRequestErrorInjected ||
                    error instanceof UserRejectedRequestErrorWalletConnect) {
                    if (connector instanceof WalletConnectConnector) {
                        walletConnector = connector;
                        walletConnector.walletConnectProvider = undefined;
                    }
                    throw Error("Please authorize to access your account");
                }
                throw error;
            }
            return [2 /*return*/];
        });
    }); }; }, [setError]);
    var connect = useCallback(function (_connectorName) { return __awaiter(_this, void 0, void 0, function () {
        var connectorName, connector, provider, err_1;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    connectorName = _connectorName !== null && _connectorName !== void 0 ? _connectorName : localStorage.getItem(CONNECTOR_STORAGE_KEY);
                    if (!connectorName)
                        return [2 /*return*/];
                    connector = getConnector(_connectorName !== null && _connectorName !== void 0 ? _connectorName : connectorName, chainId);
                    if (!connector)
                        return [2 /*return*/];
                    return [4 /*yield*/, activate(connector, onActiveWalletError(connector))];
                case 1:
                    _b.sent();
                    return [4 /*yield*/, connector.getProvider()];
                case 2:
                    provider = _b.sent();
                    if (!provider)
                        return [2 /*return*/];
                    (_a = window === null || window === void 0 ? void 0 : window.localStorage) === null || _a === void 0 ? void 0 : _a.setItem(CONNECTOR_STORAGE_KEY, connectorName);
                    _b.label = 3;
                case 3:
                    _b.trys.push([3, 5, , 6]);
                    return [4 /*yield*/, setupNetwork(chainId, provider)];
                case 4:
                    _b.sent();
                    return [3 /*break*/, 6];
                case 5:
                    err_1 = _b.sent();
                    throw Error("Can't switch to ".concat(getChainMetadata(chainId).chainName));
                case 6: return [2 /*return*/];
            }
        });
    }); }, [activate, chainId, onActiveWalletError]);
    var disconnect = useCallback(function () {
        var _a;
        deactivate();
        localStorage.removeItem("walletconnect");
        (_a = window === null || window === void 0 ? void 0 : window.localStorage) === null || _a === void 0 ? void 0 : _a.removeItem(CONNECTOR_STORAGE_KEY);
    }, [deactivate]);
    var contextValue = useMemo(function () {
        return {
            account: account,
            connect: connect,
            disconnect: disconnect,
        };
    }, [account, connect, disconnect]);
    return (React.createElement(AuthContext.Provider, { value: contextValue }, children));
}
export var useAuthContext = function () { return useContext(AuthContext); };

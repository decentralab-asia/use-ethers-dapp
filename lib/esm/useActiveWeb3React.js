var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React, Web3ReactProvider } from "@web3-react/core";
import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, } from "react";
import { getSimpleRpcProvider } from "utils/getRpcUrl";
import { setupNetwork } from "utils/wallet";
function getLibrary(provider) {
    var library = new Web3Provider(provider, typeof provider.chainId === "number"
        ? provider.chainId
        : typeof provider.chainId === "string"
            ? parseInt(provider.chainId)
            : "any");
    library.pollingInterval = 5000;
    return library;
}
export var ActiveWeb3ReactContext = createContext({});
export function ActiveWeb3ReactProvider(_a) {
    var _this = this;
    var defaultChainId = _a.defaultChainId, children = _a.children, renderLoading = _a.renderLoading;
    var _b = useWeb3React(), library = _b.library, libChainId = _b.chainId, web3React = __rest(_b, ["library", "chainId"]);
    var chainId = useMemo(function () {
        if (libChainId)
            return libChainId;
        return defaultChainId;
    }, [libChainId, defaultChainId]);
    var simpleRpcProvider = useMemo(function () { return getSimpleRpcProvider(chainId); }, [chainId]);
    var refEth = useRef(library);
    var _c = useState(library || simpleRpcProvider), provider = _c[0], setProvider = _c[1];
    useEffect(function () {
        if (library !== refEth.current) {
            setProvider(library || simpleRpcProvider);
            refEth.current = library;
        }
    }, [library, simpleRpcProvider]);
    var switchChain = useCallback(function (_chainId) { return __awaiter(_this, void 0, void 0, function () {
        var provider;
        return __generator(this, function (_a) {
            if (chainId === _chainId)
                return [2 /*return*/, true];
            provider = (library === null || library === void 0 ? void 0 : library.provider) ? library.provider : library;
            if (!(provider === null || provider === void 0 ? void 0 : provider.request))
                return [2 /*return*/, false];
            return [2 /*return*/, setupNetwork(_chainId, provider)];
        });
    }); }, [chainId, library]);
    var contextValue = useMemo(function () { return (__assign(__assign({ library: provider }, web3React), { chainId: chainId, switchChain: switchChain, simpleRpcProvider: simpleRpcProvider })); }, [provider, chainId, switchChain, web3React, simpleRpcProvider]);
    return (React.createElement(Web3ReactProvider, { getLibrary: getLibrary },
        React.createElement(ActiveWeb3ReactContext.Provider, { value: contextValue }, chainId ? children : renderLoading ? renderLoading() : "Loading...")));
}
var useActiveWeb3React = function () {
    return useContext(ActiveWeb3ReactContext);
};
export default useActiveWeb3React;

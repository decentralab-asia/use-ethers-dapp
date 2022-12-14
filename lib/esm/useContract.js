import { useMemo } from "react";
import useActiveWeb3React from "useActiveWeb3React";
import { getContract, getProviderOrSigner, } from "utils/contracts";
import { getSimpleRpcProvider } from "utils/getRpcUrl";
export function useSimpleContract(_a) {
    var contract = _a.contract, chainId = _a.chainId;
    return useMemo(function () {
        return getContract(contract, getSimpleRpcProvider(chainId));
    }, [contract, chainId]);
}
// returns null on errors
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function useContract(_a) {
    var contract = _a.contract, _b = _a.withSignerIfPossible, withSignerIfPossible = _b === void 0 ? true : _b, account = _a.account, library = _a.library;
    var _c = useActiveWeb3React(), activeLibrary = _c.library, activeAccount = _c.account, chainId = _c.chainId, simpleRpcProvider = _c.simpleRpcProvider;
    return useMemo(function () {
        return getContract(contract, withSignerIfPossible
            ? getProviderOrSigner(library !== null && library !== void 0 ? library : activeLibrary, account !== null && account !== void 0 ? account : activeAccount)
            : simpleRpcProvider);
    }, [
        contract,
        chainId,
        withSignerIfPossible,
        library,
        activeLibrary,
        account,
        activeAccount,
        simpleRpcProvider,
    ]);
}

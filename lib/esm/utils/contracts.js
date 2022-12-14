var _a;
import { getAddress } from "@ethersproject/address";
import { AddressZero } from "@ethersproject/constants";
// Imports below migrated from Exchange useContract.ts
import { Contract } from "@ethersproject/contracts";
import MULTICALL_ABI from "abis/Multicall";
import { BSC_MAINNET, BSC_TESTNET, ETHEREUM, GOERLI, MUMBAI_TESTNET, POLYGON_MAINNET, } from "./chains";
export function isAddress(value) {
    try {
        return getAddress(value);
    }
    catch (_a) {
        return false;
    }
}
// account is not optional
export function getSigner(library, account) {
    return library.getSigner(account).connectUnchecked();
}
// account is optional
export function getProviderOrSigner(library, account) {
    return account ? getSigner(library, account) : library;
}
// account is optional
export function getContract(contract, signer) {
    var address = contract.address, abi = contract.abi;
    if (!isAddress(address) || address === AddressZero) {
        throw Error("Invalid 'address' parameter '".concat(address, "'."));
    }
    return new Contract(address, abi, signer);
}
var getMulticallAddress = function (chainId) {
    switch (chainId) {
        case POLYGON_MAINNET:
            return "0x11ce4B23bD875D7F5C6a31084f55fDe1e9A87507";
        case BSC_MAINNET:
            return "0x41263cba59eb80dc200f3e2544eda4ed6a90e76c";
        case GOERLI:
            return "0x77dca2c955b15e9de4dbbcf1246b4b85b651e50e";
        case BSC_TESTNET:
            return "0x6e5BB1a5Ad6F68A8D7D6A5e47750eC15773d6042";
        case MUMBAI_TESTNET:
            return "0x08411ADd0b5AA8ee47563b146743C13b3556c9Cc";
        default:
            return "0xeefba1e63905ef1d7acba5a8513c70307c1ce441";
    }
};
export var getMulticallContract = function (chainId, provider) {
    return getContract({ address: getMulticallAddress(chainId), abi: MULTICALL_ABI }, provider);
};
export var getResultFromReceipt = function (receipt, contract) {
    var log = receipt.logs.find(function (e) {
        return e.address === contract.address &&
            e.transactionHash === receipt.transactionHash;
    });
    if (!log)
        return null;
    var data = contract.interface.parseLog(log);
    if (!(data === null || data === void 0 ? void 0 : data.args.length))
        return null;
    return data.args;
};
export var BLOCK_WAITING_SECONDS = (_a = {},
    _a[ETHEREUM] = 30,
    _a[POLYGON_MAINNET] = 6,
    _a[BSC_MAINNET] = 6,
    _a[GOERLI] = 30,
    _a[BSC_TESTNET] = 6,
    _a[MUMBAI_TESTNET] = 6,
    _a);
export var getDelayTime = function (chainId) {
    var _a;
    return ((_a = BLOCK_WAITING_SECONDS[chainId]) !== null && _a !== void 0 ? _a : 6) * 1000;
};

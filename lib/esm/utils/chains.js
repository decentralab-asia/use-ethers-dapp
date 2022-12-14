var _a;
export var ETHEREUM = 1;
export var BSC_MAINNET = 56;
export var POLYGON_MAINNET = 137;
export var GOERLI = 5;
export var BSC_TESTNET = 97;
export var MUMBAI_TESTNET = 80001;
export var NATIVE_CURRENCIES = {
    ETH: {
        name: "ETH",
        symbol: "ETH",
        decimals: 18,
    },
    MATIC: {
        name: "MATIC",
        symbol: "MATIC",
        decimals: 18,
    },
    BNB: {
        name: "BNB",
        symbol: "BNB",
        decimals: 18,
    },
};
export var CHAINS = (_a = {},
    _a[ETHEREUM] = {
        chainId: "0x".concat(ETHEREUM.toString(16)),
        chainName: "Ethereum Mainnet",
        nativeCurrency: NATIVE_CURRENCIES.ETH,
        rpcUrls: [
            "https://eth-mainnet.g.alchemy.com/v2/8ABROOCwIIuiAAXYO5YsZAIlx204ESIl/",
        ],
        blockExplorerUrls: ["https://etherscan.io"],
    },
    _a[POLYGON_MAINNET] = {
        chainId: "0x".concat(POLYGON_MAINNET.toString(16)),
        chainName: "Polygon Mainnet",
        nativeCurrency: NATIVE_CURRENCIES.MATIC,
        rpcUrls: ["https://polygon-rpc.com"],
        blockExplorerUrls: ["https://polygonscan.com"],
    },
    _a[BSC_MAINNET] = {
        chainId: "0x".concat(BSC_MAINNET.toString(16)),
        chainName: "Binance Smart Chain Mainnet",
        nativeCurrency: NATIVE_CURRENCIES.BNB,
        rpcUrls: [
            "https://bsc-dataseed.binance.org",
            "https://bsc-dataseed1.defibit.io",
            "https://bsc-dataseed1.ninicoin.io",
            "https://bsc-dataseed2.defibit.io",
            "https://bsc-dataseed3.defibit.io",
            "https://bsc-dataseed4.defibit.io",
            "https://bsc-dataseed2.ninicoin.io",
            "https://bsc-dataseed3.ninicoin.io",
            "https://bsc-dataseed4.ninicoin.io",
            "https://bsc-dataseed1.binance.org",
            "https://bsc-dataseed2.binance.org",
            "https://bsc-dataseed3.binance.org",
            "https://bsc-dataseed4.binance.org",
        ],
        blockExplorerUrls: ["https://bscscan.com"],
    },
    _a[GOERLI] = {
        chainId: "0x".concat(GOERLI.toString(16)),
        chainName: "Goerli Testnet",
        nativeCurrency: NATIVE_CURRENCIES.ETH,
        rpcUrls: [
            "https://eth-goerli.g.alchemy.com/v2/k4UdW1QHoVrD2PmC-5rBHAzdKgMaetYQ/",
        ],
        blockExplorerUrls: ["https://goerli.etherscan.io"],
    },
    _a[MUMBAI_TESTNET] = {
        chainId: "0x".concat(MUMBAI_TESTNET.toString(16)),
        chainName: "Mumbai",
        nativeCurrency: NATIVE_CURRENCIES.MATIC,
        rpcUrls: ["https://rpc-mumbai.maticvigil.com"],
        blockExplorerUrls: ["https://mumbai.polygonscan.com"],
    },
    _a[BSC_TESTNET] = {
        chainId: "0x".concat(BSC_TESTNET.toString(16)),
        chainName: "Binance Smart Chain Testnet",
        nativeCurrency: {
            name: "tBNB",
            symbol: "tBNB",
            decimals: 18,
        },
        rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545/"],
        blockExplorerUrls: ["https://testnet.bscscan.com"],
    },
    _a);
export var getChainMetadata = function (chainId) {
    if (!CHAINS[chainId])
        throw Error("Unknown chainId");
    return CHAINS[chainId];
};

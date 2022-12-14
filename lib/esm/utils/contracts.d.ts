import { Result } from "@ethersproject/abi";
import { TransactionReceipt } from "@ethersproject/abstract-provider";
import { Signer } from "@ethersproject/abstract-signer";
import { Contract } from "@ethersproject/contracts";
import { Provider, Web3Provider } from "@ethersproject/providers";
export interface ContractInfo {
    address: string;
    abi: any;
}
export declare function isAddress(value: any): string | false;
export declare function getSigner(library: Web3Provider, account: string): Signer;
export declare function getProviderOrSigner(library: Web3Provider, account?: string | null): Provider | Signer;
export declare function getContract(contract: ContractInfo, signer: Signer | Provider): Contract;
export declare const getMulticallContract: (chainId: number, provider: Signer | Provider) => Contract;
export declare const getResultFromReceipt: (receipt: TransactionReceipt, contract: Contract) => Result | null;
export declare const BLOCK_WAITING_SECONDS: {
    [key: number]: number;
};
export declare const getDelayTime: (chainId: number) => number;

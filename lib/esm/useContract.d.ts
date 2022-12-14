import { Contract } from "@ethersproject/contracts";
import { Web3Provider } from "@ethersproject/providers";
import { ContractInfo } from "utils/contracts";
export declare function useSimpleContract<T extends Contract = Contract>({ contract, chainId, }: {
    contract: ContractInfo;
    chainId: number;
}): T;
export declare function useContract<T extends Contract = Contract>({ contract, withSignerIfPossible, account, library, }: {
    contract: ContractInfo;
    withSignerIfPossible?: boolean;
    account?: string;
    library?: Web3Provider;
}): T;

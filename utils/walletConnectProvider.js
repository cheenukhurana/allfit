import WalletConnectProvider from "@walletconnect/web3-provider";
import { BAOBAB_RPC_LINK } from "./constants";

export function GetWalletConnectProvider() {
    const provider = new WalletConnectProvider({
        rpc: {
            1: BAOBAB_RPC_LINK,
        },
    });
    return provider;
}
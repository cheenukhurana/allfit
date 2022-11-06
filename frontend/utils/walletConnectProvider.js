import WalletConnectProvider from "@walletconnect/web3-provider";
import { POLYGON_MUMBAI_RPC_LINK } from "./constants.js"
import { CHAIN_ID } from "./constants.js";

export const wcProvider =  new WalletConnectProvider({
    rpc: {
        [CHAIN_ID]: POLYGON_MUMBAI_RPC_LINK
    },
});
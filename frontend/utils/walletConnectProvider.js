import WalletConnectProvider from "@walletconnect/web3-provider";
import { POLYGON_MUMBAI_RPC_LINK } from "./constants.js"
import { chainID } from "./constants.js";

export const wcProvider =  new WalletConnectProvider({
    rpc: {
        [chainID]: POLYGON_MUMBAI_RPC_LINK
    },
});
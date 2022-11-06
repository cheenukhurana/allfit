import WalletConnectProvider from "@walletconnect/web3-provider";

const POLYGON_MUMBAI_RPC_LINK = "https://matic-mumbai.chainstacklabs.com"

export const wcProvider =  new WalletConnectProvider({
    rpc: {
        80001: POLYGON_MUMBAI_RPC_LINK
    },
});
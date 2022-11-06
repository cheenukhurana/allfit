//Connects with wallet connect
//Asks to sign transaction
//Disconnect

import { wcProvider } from '../utils/walletConnectProvider.js';
import { useEffect } from "react"

export default function AttendClass() {

    useEffect(() => {

    },[])

    async function walletConnectLink() {
        console.log("Do the Wallet Connect thing here!");
        await wcProvider.enable().then(function (resp) {
            console.log("========= success!", resp);
        });
    }

    async function disconnectWalletLink() {
        wcProvider.close()
        wcProvider.on("disconnect", (code, reason) => {
            console.log(code, reason);
        });
    }

    return (
        <div>
            <button className="px-4 py-2 text-lg border border-orange-600 text-orange-600" onClick={walletConnectLink}>WalletConnect Demo</button>
            <button className="px-4 py-2 text-lg border border-orange-600 text-orange-600" onClick={disconnectWalletLink}>WalletConnect Disconnect</button>
        </div>
    )
}
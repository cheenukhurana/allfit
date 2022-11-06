//Connects with wallet connect
//Asks to sign transaction
//Disconnect

import { wcProvider } from '../utils/walletConnectProvider.js';
import { useEffect, useState } from "react"
import { addressHasNFT } from '../utils/checkNFT.js';

export default function AttendClass() {

    const [connectedAccount, setConnectedAccount] = useState(null)

    useEffect(() => {

    }, [])

    async function walletConnectLink() {
        console.log("Do the Wallet Connect thing here!");
        await wcProvider.enable().then(function (resp) {
            console.log("========= success!", resp);
            setConnectedAccount(resp[0])
        });
    }

    async function disconnectWalletLink() {
        wcProvider.disconnect()
        wcProvider.on("disconnect", (code, reason) => {
            setConnectedAccount(null)
            console.log(code, reason);
        });
    }

    async function handleCheckNFT(address) {
        if (address) {
            if (await addressHasNFT(address)) {
                alert("You may enter the gym\nWallet Address: " + address)
            }
            else {
                alert("Sorry you are not allowed to enter the gym")
            }
        }
        else {
            alert("No Account Connected")
        }
    }

    return (
        <div>
            {!connectedAccount ? (
                <button className="px-4 py-2 text-lg border border-orange-600 text-orange-600" onClick={walletConnectLink}>WalletConnect</button>
            ) : (
                <div>
                    <button className="px-4 py-2 text-lg border border-orange-600 text-orange-600" onClick={disconnectWalletLink}>WalletConnect Disconnect</button>
                    <button className="px-4 py-2 text-lg border border-orange-600 text-orange-600" onClick={() => { handleCheckNFT(connectedAccount) }}>Check NFT</button>
                </div>
            )}


        </div>
    )
}
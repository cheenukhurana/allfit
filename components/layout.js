import Link from 'next/link'
import { useAuth } from '../utils/authProvider.js';
import { GetWalletConnectProvider } from '../utils/walletConnectProvider.js';

const shortenAddress = (address) => {
    if (address)
        return address.substring(0, 6) + "..." + address.substring(address.length - 4, address.length)
}

const wcProvider = GetWalletConnectProvider();

export default function Layout({ children }) {

    const { currentAccount, setCurrentAccount } = useAuth()

    async function walletConnectLink() {
        console.log("Do the Wallet Connect thing here!");
        //  Enable session (triggers QR Code modal)
        await wcProvider.enable().then(function (resp) {
            console.log("========= success!", resp);
        });

        // Subscribe to session disconnection
        wcProvider.on("disconnect", (code, reason) => {
            console.log(code, reason);
        });
    }

    return (
        <div className="h-screen p-6">
            <div>
                <header className="flex justify-between mb-6">
                    <div className="flex items-center">
                        <h3 className="text-xl font-extrabold"><Link href="/"><a>All Fit</a></Link></h3>
                        {currentAccount && <p className="ml-8 text-gray-600"><Link href="/dashboard"><a>Dashboard</a></Link></p>}
                    </div>
                    {currentAccount ? (
                        <h4>{shortenAddress(currentAccount)}</h4>
                    ) : (
                        <button className="px-4 py-2 text-lg border border-orange-600 text-orange-600" onClick={setCurrentAccount}>Connect Wallet</button>
                    )}

                    <button className="px-4 py-2 text-lg border border-orange-600 text-orange-600" onClick={walletConnectLink}>Connect Wallet</button>
                </header>
                <main>
                    {children}
                </main>
            </div>

            <footer>
                <div className="mt-8 mb-6 border border-grey-600"></div>
                <div className="flex justify-between">
                    <p>Life is in this moment. There is no other meaning of life.</p>
                </div>
            </footer>
        </div>
    )
}
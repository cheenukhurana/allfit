import { useAuth } from "../utils/authProvider";
import Layout from "../components/layout";

const Dashboard = () => {
    const { currentAccount, setCurrentAccount } = useAuth()

    return (
        <div>


            {currentAccount ? (
                <Layout>

                </Layout>
            ) : (
                <div className="flex justify-center h-screen items-center content-center">
                    <button className="px-4 py-2 text-lg border border-orange-600 text-orange-600" onClick={setCurrentAccount}>Connect Wallet</button>
                </div>
            )}
        </div>
    )
}

export default Dashboard
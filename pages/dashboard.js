import { useAuth } from "../utils/authProvider";
import Layout from "../components/layout";
import { useEffect, useState } from "react";

const fetchNFTDataForUser = async () => {
    return [
        {
            imgURL: "1months.png",
            validity: "100000"
        },
        {
            imgURL: "6months.png",
            validity: "100000"
        }
    ]
}

function secondsToDhms(seconds) {
    seconds = Number(seconds);
    var d = Math.floor(seconds / (3600 * 24));
    var h = Math.floor(seconds % (3600 * 24) / 3600);
    var m = Math.floor(seconds % 3600 / 60);
    var s = Math.floor(seconds % 60);

    var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days ") : "";
    var hDisplay = h > 0 ? h + (h == 1 ? " hour " : " hours ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute " : " minutes ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    return dDisplay + hDisplay + mDisplay + sDisplay;
}

const Dashboard = () => {
    const { currentAccount, setCurrentAccount } = useAuth()
    const [userNFTs, setUserNFTs] = useState([])
    
    useEffect(() => {
        if (currentAccount) {
            fetchNFTDataForUser(currentAccount)
                .then(res => {
                    setUserNFTs(res)
                })
        }
    }, [currentAccount])

    return (
        <div>
            {currentAccount ? (
                <Layout>
                    <div className="flex">
                        {
                            userNFTs.map((userNFT) => (
                                <div>
                                    <div><img className="w-[14rem] border border-gray-400" src={`/membershipNFTs/${userNFT.imgURL}`} alt=""></img></div>
                                    <div>Valid for {secondsToDhms(userNFT.validity)}</div>
                                </div>
                            ))
                        }
                    </div>
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
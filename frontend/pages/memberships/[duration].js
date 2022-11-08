import Layout from "../../components/layout";
import { membershipTypesData } from "../../membershipTypesData";
import { useAuth } from "../../utils/authProvider";
import { CreateSubscription } from "../../utils/mintNFT";
import { ipfsURLs } from "../../utils/constants";

// const buyMembership = async (currentAccount) => {
//     console.log("Waiting for transaction to happen")
//     var prom = new Promise((resolve) => {
//         setTimeout(() => {
//             resolve()
//         }, 3000)
//     })
//     return prom
// }


export default function MembershipType({ membershipTypeData }) {

    const { currentAccount, setCurrentAccount } = useAuth()

    const handleBuyNow = async (address, duration) => {
        if(address){
            // buyMembership(address, )
            // .then(() => console.log("Transaction complete")) 
            console.log(address+" "+duration+" "+ipfsURLs[duration])
            CreateSubscription(address, ipfsURLs[duration], 0)
        }
        else {
            alert("Please connect your wallet")
        }
    }

    return (
        <Layout>
            <p className="text-xl">{membershipTypeData.duration} Months All Pass</p>
            <ul className="mt-2 list-disc list-inside">
                <li>{membershipTypeData.extras}</li>
            </ul>
            <p className="text-xl mt-4 text-orange-500">{membershipTypeData.price} Dai</p>
            <img className="w-[14rem] border border-gray-400 mt-8" src={`/membershipNFTs/${membershipTypeData.duration}months.png`} alt=""></img>
            <p className="mt-4">You will be minted this nft upon buying</p>
            {currentAccount ? (
                <button className="mt-4 px-2 py-1 bg-white text-orange-500 hover:text-orange-700 rounded border border-orange-400 hover:border-orange-700" onClick={() => handleBuyNow(currentAccount, membershipTypeData.duration)}>BUY NOW</button>
            ) : (
                <button className="mt-4 px-2 py-1 bg-white text-orange-500 hover:text-orange-700 rounded border border-orange-400 hover:border-orange-700" onClick={setCurrentAccount}>Connect Wallet</button>
            )}
            
        </Layout>
    )
}


export async function getStaticPaths() {
    const paths = membershipTypesData.map((membershipType) => {
        return {
            params: {
                duration: String(membershipType.duration),
            }
        }
    })

    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params }) {
    let membershipTypeData = {}
    for (let i = 0; i < membershipTypesData.length; i++) {
        if (membershipTypesData[i].duration == params.duration) {
            membershipTypeData = membershipTypesData[i]
        }
    }

    return {
        props: {
            membershipTypeData,
        },
    };
}

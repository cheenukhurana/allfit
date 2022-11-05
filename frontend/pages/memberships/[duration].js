import Layout from "../../components/layout";
import { membershipTypesData } from "../../membershipTypesData";
import { useAuth } from "../../utils/authProvider";

const buyMembership = async (currentAccount) => {
    console.log("Waiting for transaction to happen")
    var prom = new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, 3000)
    })
    return prom
}

export default function MembershipType({ membershipTypeData }) {

    const { currentAccount } = useAuth()

    const handleBuyNow = async () => {
        if(currentAccount){
            buyMembership(currentAccount)
            .then(() => console.log("Transaction complete")) 
        }
        else {
            alert("Please connect your wallet")
        }
    }

    return (
        <Layout>
            {membershipTypeData.duration} months
            <img className="w-[14rem] border border-gray-400" src={`/membershipNFTs/${membershipTypeData.duration}months.png`} alt=""></img>
            <p className="mt-4">You will be minted this nft upon buying</p>
            <button className="mt-2 px-2 py-1 bg-white text-orange-500 rounded border border-gray-400" onClick={handleBuyNow}>BUY NOW</button>
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

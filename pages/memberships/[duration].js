import Layout from "../../components/layout";
import { membershipTypesData } from "../../membershipTypesData";

export default function MembershipType({ membershipTypeData }) {

    return (
        <Layout>
            {membershipTypeData.duration} months
            <img className="w-[14rem] border border-gray-400" src={`/membershipNFTs/${membershipTypeData.duration}months.png`} alt=""></img>
            <p className="mt-4">You will be minted this nft upon buying</p>
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

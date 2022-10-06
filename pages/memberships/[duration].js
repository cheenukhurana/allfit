import Layout from "../../components/layout";
import { membershipTypesData } from "../../membershipTypesData";

export default function MembershipType({ membershipTypeData }) {

    return (
        <Layout>
            {membershipTypeData.duration} months
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

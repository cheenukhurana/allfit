import { membershipTypesData } from "../membershipTypesData"
import Link from 'next/link'
import { GetSubscriptionContract } from "../utils/NFTSubscriptionUtils";
import { useAuth } from "../utils/authProvider";
import { ethers } from 'ethers';
import { STORE_CONTRACT_ADDRESS, NFT_CONTRACT_ADDRESS } from "../utils/constants";
import { SUBSCRIPTION_ABI, STORE_ABI } from "../utils/contract_abis";

const MembershipTypes = () => {

    const storeContract = new ethers.Contract(
        STORE_CONTRACT_ADDRESS,
        STORE_ABI,
        signer
    );
    console.log("========= storeContract is: ", storeContract, storeContract.address);

    const subscriptionContract = new ethers.Contract(
        NFT_CONTRACT_ADDRESS,
        SUBSCRIPTION_ABI,
        signer
    );
    console.log("========= subscriptionContract is: ", subscriptionContract, subscriptionContract.address);

    const { currentAccount, setCurrentAccount } = useAuth();

    async function CreateSubscription(creator_address, img_url, payment_val) {
        await subscriptionContract.makePaymentToStore(payment_val, {
            gasLimit: '100000'
        }).then(function (resp) {
            console.log("========= payment resp: ", resp);
            subscriptionContract.createSubscription('ipfs://subscription_tes01',
                img_url,
                creator_address,
                1670426482, {
                gasLimit: '100000'
            }).then(function (resp) {
                console.log("========= created subscription: ", resp);
            });
        });
    }

    const handleMembershipBuy = async () => {
        console.log("Want to buy");
    }

    return (
        <div className="flex">
            {membershipTypesData.map((membership, index) => (
                <div key={membership.duration} className="rounded-lg p-4 bg-gray-500 mx-5 cursor-pointer" onClick={handleMembershipBuy}>
                    {/* <Link href={`/memberships/${membership.duration}`}>
                        <div className="border-b border-b-gray-100 flex justify-between pb-2">
                            <div className="flex flex-col">
                                <p>{membership.duration}</p>
                                <p>MONTHS</p>
                            </div>
                            <div>{membership.price} Dai</div>
                        </div>
                        <div className="mt-2">Get {membership.extras}</div>
                        <button className="mt-2 px-2 py-1 bg-white text-orange-500 rounded mx-auto block">BUY NOW</button>
                    </Link> */}
                    <div className="border-b border-b-gray-100 flex justify-between pb-2">
                        <div className="flex flex-col">
                            <p>{membership.duration}</p>
                            <p>MONTHS</p>
                        </div>
                        <div>{membership.price} Dai</div>
                    </div>
                    <div className="mt-2">Get {membership.extras}</div>
                    <button className="mt-2 px-2 py-1 bg-white text-orange-500 rounded mx-auto block">BUY NOW</button>
                </div >
            ))}
        </div >
    )
}

export default MembershipTypes
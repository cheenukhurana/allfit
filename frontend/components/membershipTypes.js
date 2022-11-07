import { membershipTypesData } from "../membershipTypesData"
import Link from 'next/link'
import { GetSubscriptionContract } from "../utils/NFTSubscriptionUtils";
import { useAuth } from "../utils/authProvider";
import { ethers } from 'ethers';
import { STORE_CONTRACT_ADDRESS, NFT_CONTRACT_ADDRESS } from "../utils/constants";
import { SUBSCRIPTION_ABI, STORE_ABI } from "../utils/contract_abis";

const MembershipTypes = () => {

    const { currentAccount, setCurrentAccount } = useAuth();

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
        <div>

            <p className="text-center mt-12 text-xl"> Choose Your All Pass</p>
            <div className="mt-8 flex justify-around">
                {membershipTypesData.map((membership, index) => (
                    <div key={membership.duration} className="rounded-lg bg-slate-400 hover:bg-slate-600 mx-6 cursor-pointer" onClick={handleMembershipBuy}>
                        <Link href={`/memberships/${membership.duration}`}>
                            <img className="block rounded-tl-lg rounded-tr-lg" src={`/membershipNFTs/${membership.duration}months.png`} alt="" />
                            <div className="border-b border-b-gray-100 flex justify-between p-4">
                                <p>{membership.duration} MONTHS</p>
                                <div>{membership.price} Dai</div>
                            </div>
                            <div className="mt-2 px-4">Get {membership.extras}</div>
                            <button className="m-3 px-2 py-1 bg-white text-orange-500 hover:text-orange-700 rounded mx-auto block">BUY NOW</button>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MembershipTypes
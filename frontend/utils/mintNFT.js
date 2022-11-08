import { STORE_CONTRACT_ADDRESS, NFT_CONTRACT_ADDRESS } from "./constants";
import { SUBSCRIPTION_ABI, STORE_ABI } from "./contract_abis";
import { ethers } from 'ethers';
import { useAuth } from "./authProvider";

// const storeContract = new ethers.Contract(
//     STORE_CONTRACT_ADDRESS,
//     STORE_ABI,
//     signer
// );
// console.log("========= storeContract is: ", storeContract, storeContract.address);

// const subscriptionContract = new ethers.Contract(
//     NFT_CONTRACT_ADDRESS,
//     SUBSCRIPTION_ABI,
//     signer
// );
// console.log("========= subscriptionContract is: ", subscriptionContract, subscriptionContract.address);

export async function CreateSubscription(creator_address, img_url, payment_val) {

    // const {signer} = useAuth()

    const { ethereum } = window
    const pr = new ethers.providers.Web3Provider(ethereum);
    // const pr = ethers.getDefaultProvider();
    const signer = pr.getSigner()

    const subscriptionContract = new ethers.Contract(
        NFT_CONTRACT_ADDRESS,
        SUBSCRIPTION_ABI,
        signer
    );

    // await subscriptionContract.makePaymentToStore(payment_val, {
    //     gasLimit: '3000000'
    // }).then(function (resp) {
    //     console.log("========= payment resp: ", resp);
    //     subscriptionContract.createSubscription(img_url,
    //         img_url,
    //         creator_address,
    //         1670426482, {
    //         gasLimit: '3000000'
    //     }).then(function (resp) {
    //         console.log("========= created subscription: ", resp);
    //     });
    // });

    subscriptionContract.createSubscription(img_url,
        img_url,
        creator_address,
        1670426482, {
        gasLimit: '3000000'
    }).then(function (resp) {
        console.log("========= created subscription: ", resp);
    });
}
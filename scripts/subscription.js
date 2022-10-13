// test.js
const Caver = require('caver-js')
const caver = new Caver('https://api.baobab.klaytn.net:8651/')
const fs = require('fs');

const keyring = caver.wallet.keyring.createFromPrivateKey('3d31f2f1c1de57e57c2830192cfab9032a88ce2ba4601dd307267bdf59be3edf')
caver.wallet.add(keyring)

function getSubscriptionContract(contractAddr) {
    const contract = JSON.parse(fs.readFileSync('./_backend/build/contracts/GymSubscription.json', 'utf8'));
    const abi = contract.abi;
    const contractInstance = caver.contract.create(abi, contractAddr);
    console.log("Got the contract instance Address: ", contractInstance.options.address);
    return contractInstance;
}

async function createStoreSubscription(subscriptionContract, subOwnerAddress, invalidAfter) {
    await subscriptionContract.send({ from: keyring.address, gas: '0x4bfd200' },
        'createSubscription',
        'ipfs://subscription_tes01',
        subOwnerAddress,
        invalidAfter).then(function (resp) {
            console.log("======== CreateSubscription response is: ", resp);
        });
}

async function ownerHasStoreSubscription(subscriptionContract, ownerAddress) {
    await subscriptionContract.call('hasStoreSubscription', ownerAddress).then(function (resp) {
        console.log("======== hasStoreSubscription response is: ", resp);
    });
}

subContract = getSubscriptionContract('0xff26daa16349a6C650ABd1C7218b4cC39c321Aa9');
// createStoreSubscription(subContract, "0xf4267F20B463421D2cF3db534491b7920F79Ac4F", 1668245694);
// ownerHasStoreSubscription(subContract, "0xf4267F20B463421D2cF3db534491b7920F79Ac4F");
ownerHasStoreSubscription(subContract, "0xDeC6Df558e198A7745AcBe881f61B3506D59CFC4");
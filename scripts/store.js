// test.js
const Caver = require('caver-js')
const caver = new Caver('https://api.baobab.klaytn.net:8651/')
const fs = require('fs');

const keyring = caver.wallet.keyring.createFromPrivateKey('3d31f2f1c1de57e57c2830192cfab9032a88ce2ba4601dd307267bdf59be3edf')
caver.wallet.add(keyring)

function getStoreContract(contractAddr) {
    const contract = JSON.parse(fs.readFileSync('./_backend/build/contracts/GymStore.json', 'utf8'));
    const abi = contract.abi;
    const contractInstance = caver.contract.create(abi, contractAddr);
    console.log("Got the contract instance Address: ", contractInstance.options.address)
    return contractInstance;
}

async function createStoreToken(storeContract) {
    await storeContract.send({ from: keyring.address, gas: '0x4bfd200' }, 'createStore', 'ipfs://tes01', []).then(function (resp) {
        console.log("======== CreateStore response is: ", resp);
    });
}

async function getStoreFromId(storeContract, storeId) {
    await storeContract.call('getStore', storeId).then(function (resp) {
        console.log("======== getStore response is: ", resp);
    });
}

async function getStoreFromOwner(storeContract, ownerAddress) {
    await storeContract.call('getOwnerStore', ownerAddress).then(function (resp) {
        console.log("======== getOwnerStore response is: ", resp);
    });
}

stContract = getStoreContract('0x123171CcECAc9154969eBbFA53c3D7c7660bCdaF');
// createStoreToken(stContract);
// getStoreFromId(stContract, 0);
// getStoreFromOwner(stContract, "0xf4267F20B463421D2cF3db534491b7920F79Ac4F");
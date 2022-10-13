const gymStore = artifacts.require("GymStore");
const gymSubscription = artifacts.require("GymSubscription");

module.exports = async function (deployer) {
    var storeAddr = undefined;
    await deployer.deploy(gymStore).then(function (resp) {
        console.log("GymStore Contract Deployed at: ", resp.address);
        storeAddr = resp.address;
    });

    if (storeAddr) {
        await deployer.deploy(gymSubscription, storeAddr).then(function (res) {
            console.log("GymSubscription Contract deployed at: ", res.address);
        });
    }

};
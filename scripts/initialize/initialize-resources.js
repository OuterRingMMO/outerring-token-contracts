const hre = require("hardhat");
const resources = require('../json/resources.json').resources;

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

async function main() {

    const MultiSig = await hre.deployments.get('MultiSigWalletWithTimeLock');
    const multiSig = await ethers.getContractAt('MultiSigWalletWithTimeLock', MultiSig.address);

    owner = await ethers.getSigner();

    for await (let element of resources) {

        let Resource = await hre.deployments.get(element.name);
        let resource = await ethers.getContractAt('Resource', Resource.address);

        await resource.initialize(element.name, element.symbol, multiSig.address);

        sleep(5000);
    }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

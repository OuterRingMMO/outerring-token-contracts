const hre = require("hardhat");

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

    const multiSig = '0xAA4cc2ce3A25E53547f2d996c91C6bad72725C4e';
    const name = 'TokenProof';
    const symbol = 'TOKP';

    owner = await ethers.getSigner();

    let Resource = await hre.deployments.get('Resource');
    let resource = await ethers.getContractAt('Resource', Resource.address);
    
    const tx = await resource.initialize(name, symbol, multiSig);
    console.log(tx);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

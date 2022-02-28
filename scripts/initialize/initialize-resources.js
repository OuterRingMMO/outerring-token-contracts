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

    const multiSig = '0x29e05FADE91a33A413e39D980D86F253123C5fa7';
    const name = 'Argon';
    const symbol = 'ARG';

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

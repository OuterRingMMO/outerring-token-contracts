const hre = require("hardhat");

async function main() {

    owner = await ethers.getSigner();

    const MultiSig = await hre.deployments.get('MultiSigWalletWithTimeLock');
    const multiSig = await ethers.getContractAt('MultiSigWalletWithTimeLock', MultiSig.address);

    let Resource = await hre.deployments.get('SCK');
    let resource = await ethers.getContractAt('Resource', Resource.address);

    await resource.initialize('Space Corsair Key', 'SCK', multiSig.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

const hre = require("hardhat");

async function main() {

    owner = await ethers.getSigner();

    let Resource = await hre.deployments.get('Resource');
    let resource = await ethers.getContractAt('Resource', Resource.address);
    const multiSigAddress = '';
    const tx = await resource.initialize('Space Corsair Key', 'SCK', multiSigAddress);
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

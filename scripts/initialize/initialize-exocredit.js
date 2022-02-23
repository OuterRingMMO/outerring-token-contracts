const hre = require("hardhat");

async function main() {

    owner = await ethers.getSigner();
    
    const Exo = await hre.deployments.get('Exocredit');
    const exo = await ethers.getContractAt('Exocredit', Exo.address);

    const MultiSig = await hre.deployments.get('MultiSigWalletWithTimeLock');
    const multiSig = await ethers.getContractAt('MultiSigWalletWithTimeLock', MultiSig.address);
    
    await exo.initialize(multiSig.address);
    
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

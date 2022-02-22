const hre = require("hardhat");

async function main() {

    const ADMIN_ROLE = '0x0000000000000000000000000000000000000000000000000000000000000000';
    const MINTER_ROLE = '0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6';

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

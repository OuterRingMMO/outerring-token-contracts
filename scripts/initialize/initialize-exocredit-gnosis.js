const hre = require("hardhat");

async function main() {

    owner = await ethers.getSigner();
    
    const Exo = await hre.deployments.get('Exocredit');
    const exo = await ethers.getContractAt('Exocredit', Exo.address);
    
    await exo.initialize('0x4Afb351144FB1672e5bd611F5baA889429970Ff5');
    
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

import { ethers } from "hardhat";
import { HardhatRuntimeEnvironment } from "hardhat/types";

async function main(hre: HardhatRuntimeEnvironment): Promise<void> {

    const Exo = await hre.deployments.get('Exocredit');
    const exo = await ethers.getContractAt('Exocredit', Exo.address);
    
    await exo.initialize('0x3fE68df7D838e66DAA2Ffff4d0e77F6C83079AE3');
    
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main(hre)
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

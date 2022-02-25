import { ethers } from "hardhat";
import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const deploy: DeployFunction = async function (
    hre: HardhatRuntimeEnvironment,
) {
    const { deployments, getNamedAccounts } = hre;
    const { deployer } = await getNamedAccounts();
    const { deploy } = deployments;

    const MultiSig = await hre.deployments.get('MultiSigWalletWithTimeLock');
    const multiSig = await ethers.getContractAt('MultiSigWalletWithTimeLock', MultiSig.address);
    
    const gqToken = await deploy('GalacticQuadrant', {
        from: deployer,
        args: [multiSig.address],
        log: true
    });

    console.log('GQ Token deployed at: ', gqToken.address);

    const GQ = await hre.deployments.get('GalacticQuadrant');
    const GQDeployed = await ethers.getContractAt('GalacticQuadrant', GQ.address);
    await hre.run("verify:verify", {
        address: GQDeployed.address,
        contract: "contracts/GalacticQuadrant.sol:GalacticQuadrant",
        constructorArguments: [multiSig.address]
    });

};

deploy.tags = ['GQ']
export default deploy;
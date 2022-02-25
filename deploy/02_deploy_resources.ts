import { ethers } from "hardhat";
import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const deploy: DeployFunction = async function (
    hre: HardhatRuntimeEnvironment,
) {
    const { deployments, getNamedAccounts } = hre;
    const { deployer } = await getNamedAccounts();
    const { deploy } = deployments;

    const resourceToken = await deploy('Resource', {
        from: deployer,
        args: [],
        log: true,
        proxy: {
            proxyContract: 'OpenZeppelinTransparentProxy',
        }
    });

    console.log('Resource Token  deployed at: ', resourceToken.address);

    const resourceImplementation = await hre.deployments.get('Resource_Implementation');
    const resourceDeployed = await ethers.getContractAt('Resource', resourceImplementation.address);
    await hre.run("verify:verify", {
        address: resourceDeployed.address,
        contract: "contracts/Resource.sol:Resource"
    });

};

deploy.tags = ['Resource']
export default deploy;
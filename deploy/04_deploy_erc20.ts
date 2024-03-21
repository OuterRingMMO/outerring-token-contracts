import { ethers } from "hardhat";
import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const deploy: DeployFunction = async function (
    hre: HardhatRuntimeEnvironment,
) {
    const { deployments, getNamedAccounts } = hre;
    const { deployer } = await getNamedAccounts();
    const { deploy } = deployments;
    
    const erc20 = await deploy('TestERC20', {
        from: deployer,
        args: [],
        log: true,
        waitConfirmations: 20
    });
    console.log('ERC20 deployed at: ', erc20.address);
    
    const ERC20 = await deployments.get('TestERC20');
    const ERC20Deployed = await ethers.getContractAt('TestERC20', ERC20.address);
    await hre.run("verify:verify", {
        address: ERC20Deployed.address,
        contract: "contracts/TestERC20.sol:TestERC20",
        constructorArguments: []
    });
};

deploy.tags = ['TestERC20']
export default deploy;
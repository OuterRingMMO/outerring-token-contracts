import { ethers } from "hardhat";
import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const name: string = "Hydrogen";
const symbol: string = "HDR";
const multiSigWallet: string = "0x2aBcbdF5a10082F311D666EC58aD1C90948a2F4a";

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
            execute: {
                init: {
                    methodName: "initialize",
                    args: [name, symbol, multiSigWallet]
                }
            }
        }
    });

    console.log('Resource Token  deployed at: ', resourceToken.address);

    delay(5000);

    const resourceImplementation = await hre.deployments.get('Resource_Implementation');
    const resourceDeployed = await ethers.getContractAt('Resource', resourceImplementation.address);
    await hre.run("verify:verify", {
        address: resourceDeployed.address,
        contract: "contracts/Resource.sol:Resource"
    });

};

deploy.tags = ['Resource']
export default deploy;
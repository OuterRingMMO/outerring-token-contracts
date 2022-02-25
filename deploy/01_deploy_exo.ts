import { ethers } from "hardhat";
import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const deploy: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment,
) {
  const { deployments, getNamedAccounts } = hre;
  const { deployer } = await getNamedAccounts();
  const { deploy } = deployments;

  const exoToken = await deploy('Exocredit', {
    from: deployer,
    args: [],
    log: true,
    proxy: {
        proxyContract: 'OpenZeppelinTransparentProxy',
    }
});

console.log('EXO Token deployed at: ', exoToken.address);

const exoImplementation = await hre.deployments.get('Exocredit_Implementation');
const ExoDeployed = await ethers.getContractAt('Exocredit', exoImplementation.address);
await hre.run("verify:verify", {
    address: ExoDeployed.address,
    contract: "contracts/Exocredit.sol:Exocredit"
});

};

deploy.tags = ['Exocredit']
export default deploy;
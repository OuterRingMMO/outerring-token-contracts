import { ethers } from "hardhat";
import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const name: string = "Cobalt";
const symbol: string = "COB";
const multiSigWallet: string = "0x29e05FADE91a33A413e39D980D86F253123C5fa7";

const deploy: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deployer } = await getNamedAccounts();
  const { deploy } = deployments;

  const resourceToken = await deploy("Resource", {
    from: deployer,
    args: [],
    log: true,
    proxy: {
      proxyContract: "OpenZeppelinTransparentProxy",
      execute: {
        init: {
          methodName: "initialize",
          args: [name, symbol, multiSigWallet],
        },
      },
    },
  });

  console.log("Resource Token  deployed at: ", resourceToken.address);

  delay(5000);

  const resourceImplementation = await hre.deployments.get(
    "Resource_Implementation"
  );
  const resourceDeployed = await ethers.getContractAt(
    "Resource",
    resourceImplementation.address
  );
  await hre.run("verify:verify", {
    address: resourceDeployed.address,
    contract: "contracts/Resource.sol:Resource",
  });
};

deploy.tags = ["Resource"];
export default deploy;

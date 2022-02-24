module.exports = async ({ getNamedAccounts, deployments }) => {

    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();

    

    const wallet = await deploy('GnosisSafe', {
        from: deployer,
        args: [],
        log: true,
        deterministicDeployment: true
    });

    console.log('GnosisSafe deployed at: ', wallet.address);

    const walletDeployed = await ethers.getContractAt('GnosisSafe', wallet.address);
    await run("verify:verify", {
        address: walletDeployed.address,
        contract: "contracts/multisig/GnosisSafe.sol:GnosisSafe",
    });
};

module.exports.tags = ['singleton', 'main-suite'];
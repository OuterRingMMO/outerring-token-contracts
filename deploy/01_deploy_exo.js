module.exports = async ({ getNamedAccounts, deployments }) => {

    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();

    const exoToken = await deploy('ExoCredit', {
        from: deployer,
        args: [],
        log: true,
        proxy: {
            proxyContract: 'OpenZeppelinTransparentProxy',
        }
    });

    console.log('EXO Token deployed at: ', exoToken.address);

    const exoImplementation = await hre.deployments.get('ExoCredit_Implementation');
    const ExoDeployed = await ethers.getContractAt('ExoCredit', exoImplementation.address);
    await run("verify:verify", {
        address: ExoDeployed.address,
        contract: "contracts/ExoCredit.sol:ExoCredit"
    });
};

module.exports.tags = ['Exocredit'];
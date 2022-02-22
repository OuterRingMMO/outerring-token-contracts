module.exports = async ({ getNamedAccounts, deployments }) => {

    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();

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
    await run("verify:verify", {
        address: ExoDeployed.address,
        contract: "contracts/Exocredit.sol:Exocredit"
    });
};

module.exports.tags = ['Exocredit'];
module.exports = async ({ getNamedAccounts, deployments }) => {

    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();

    const gqToken = await deploy('GalacticQuadrant', {
        from: deployer,
        args: [],
        log: true,
        proxy: true
    });

    console.log('GQ Token deployed at: ', gqToken.address);

    const GQImplementation = await hre.deployments.get('GalacticQuadrant_Implementation');
    const GQImplementationDeployed = await ethers.getContractAt('GalacticQuadrant', GQImplementation.address);
    await run("verify:verify", {
        address: GQImplementationDeployed.address,
        contract: "contracts/GalacticQuadrant.sol:GalacticQuadrant"
    });
};

module.exports.tags = ['GalacticQuadrant'];
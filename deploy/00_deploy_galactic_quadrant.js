module.exports = async ({ getNamedAccounts, deployments }) => {

    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();

    const gqToken = await deploy('GalacticQuadrant', {
        from: deployer,
        args: [],
        log: true
    });

    console.log('GQ Token deployed at: ', gqToken.address);

    const GQ = await hre.deployments.get('GalacticQuadrant');
    const GQDeployed = await ethers.getContractAt('GalacticQuadrant', GQ.address);
    await run("verify:verify", {
        address: GQDeployed.address,
        contract: "contracts/GalacticQuadrant.sol:GalacticQuadrant"
    });
};

module.exports.tags = ['GalacticQuadrant'];
module.exports = async ({ getNamedAccounts, deployments }) => {

    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();

    const resourceToken = await deploy('Resource', {
        from: deployer,
        args: ['Space Corsair Key', 'SCK'],
        log: true,
        proxy: {
            proxyContract: 'OpenZeppelinTransparentProxy',
        }
    });

    console.log('Resource Token  deployed at: ', resourceToken.address);

    const resourceImplementation = await hre.deployments.get('Resource_Implementation');
    const resourceDeployed = await ethers.getContractAt('Resource', resourceImplementation.address);
    await run("verify:verify", {
        address: resourceDeployed.address,
        contract: "contracts/Resource.sol:Resource"
    });
};

module.exports.tags = ['SCK'];
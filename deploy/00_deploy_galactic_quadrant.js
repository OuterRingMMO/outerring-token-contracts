module.exports = async ({ getNamedAccounts, deployments }) => {

    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();
    
    const resourceToken = await deploy('GalacticQuadrant', {
        from: deployer,
        args: [],
        log: true,
        proxy: true
    });

    console.log('Resource Token deployed at: ', resourceToken.address);

    // Verification block
    await run("verify:verify", {
         address: resourceToken.address,
         contract: "contracts/tokens/ResourceToken.sol:ResourceToken"
    });
};

module.exports.tags = ['ResourceToken'];
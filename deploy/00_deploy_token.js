module.exports = async ({ getNamedAccounts, deployments }) => {

    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();
    
    const stakeToken = await deploy('ResourceToken', {
        from: deployer,
        args: [],
        log: true,
    });

    console.log('Resource Token deployed at: ', stakeToken.address);

    // Verification block
    await run("verify:verify", {
         address: stakeToken.address,
         contract: "contracts/tokens/ResourceToken.sol:ResourceToken"
    });
};

module.exports.tags = ['ResourceToken'];
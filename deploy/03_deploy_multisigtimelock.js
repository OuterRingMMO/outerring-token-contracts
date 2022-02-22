module.exports = async ({ getNamedAccounts, deployments }) => {

    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();

    const owners = ['0x2aBcbdF5a10082F311D666EC58aD1C90948a2F4a', '0x6080903C0017d0A6cf7C861910Cbc805Ee62740A'];
    const required = 2;
    const seconds = 30;

    const wallet = await deploy('MultiSigWalletWithTimeLock', {
        from: deployer,
        args: [owners, required, seconds],
        log: true
    });

    console.log('MultiSigWalletWithTimeLock deployed at: ', wallet.address);

    const walletDeployed = await ethers.getContractAt('MultiSigWalletWithTimeLock', wallet.address);
    await run("verify:verify", {
        address: walletDeployed.address,
        contract: "contracts/multisigwithtimelock/MultiSigWalletWithTimeLock.sol:MultiSigWalletWithTimeLock",
        constructorArguments: [owners, required, seconds]
    });
};

module.exports.tags = ['MultiSigWalletWithTimeLock'];
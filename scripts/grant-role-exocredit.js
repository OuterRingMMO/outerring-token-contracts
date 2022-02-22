const { parseEther } = require("ethers/lib/utils");
const { ethers } = require("hardhat");
const hre = require("hardhat");

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

async function main() {

    const ADMIN_ROLE = '0x0000000000000000000000000000000000000000000000000000000000000000';
    const MINTER_ROLE = '0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6';

    owners = await ethers.getSigners();

    const Exo = await hre.deployments.get('Exocredit');
    const exo = await ethers.getContractAt('Exocredit', Exo.address);

    const MultiSig = await hre.deployments.get('MultiSigWalletWithTimeLock');
    const multiSig = await ethers.getContractAt('MultiSigWalletWithTimeLock', MultiSig.address);

    console.log(owners[1].address);

    const payload = exo.interface.encodeFunctionData("grantRole", [MINTER_ROLE, owners[2].address]);
    const ether = parseEther("0.01")
    let tx = await multiSig.submitTransaction(exo.address, ether, payload);
    console.log(tx);
    sleep(2000);
    tx = await multiSig.connect(owners[1]).confirmTransaction(5)
    console.log(tx);
    sleep(2000);
    tx = await multiSig.executeTransaction(5);
    console.log(tx);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

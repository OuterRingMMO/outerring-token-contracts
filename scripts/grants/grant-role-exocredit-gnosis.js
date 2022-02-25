const { parseEther } = require("ethers/lib/utils");
const { ethers } = require("hardhat");
const hre = require("hardhat");
const gnosisABI = require('../../artifacts/contracts/multisig/GnosisSafe.sol/GnosisSafe.json').abi;

async function main() {

    const ADMIN_ROLE = '0x0000000000000000000000000000000000000000000000000000000000000000';
    const MINTER_ROLE = '0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6';

    const owners = await ethers.getSigners();
    console.log(owners);
    const Exo = await hre.deployments.get('Exocredit');
    const exo = await ethers.getContractAt('Exocredit', Exo.address);
    const safe = new ethers.Contract('0x4Afb351144FB1672e5bd611F5baA889429970Ff5',gnosisABI, owners[0]);
    const signerSafe = safe.connect(owners[0]);
    const newMinterAddress = '0x7A65b7052d9e595AF9A3A60D0eE378Ab871914e4';
    const payload = exo.interface.encodeFunctionData("grantRole", [MINTER_ROLE, newMinterAddress]);
    
    let to = exo.address;
    let value = 0;
    let data = payload;
    let operation = 0;
    let safeTxGas = 0;
    let baseGas = 0;
    let gasPrice = 0;
    let gasToken = '0x0';
    let refundReceiver = '0x0';
    
    const tx = buildSafeTransaction({ to: to, safeTxGas: 1000000, nonce: await safe.nonce()})
    const signatures = buildSignatureBytes([await safeApproveHash(owners[1], signerSafe, tx, true)]);
    
    const ether = parseEther("0.0");
    await signerSafe.execTransaction(to, value, data, operation, safeTxGas, baseGas, gasPrice, gasToken, refundReceiver, signatures);
    /*
    let tx = await multiSig.submitTransaction(exo.address, ether, payload);
    console.log(tx);
    sleep(5000);
    tx = await multiSig.connect(owners[1]).confirmTransaction(transactions.toString())
    console.log(tx);
    sleep(10000);
    tx = await multiSig.executeTransaction(transactions.toString());
    console.log(tx);*/
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

import * as dotenv from "dotenv";
dotenv.config()

import { task } from "hardhat/config";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-ethers";
import "hardhat-deploy";

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.4",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.7.6",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.5.9",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  namedAccounts: {
    deployer: 0
  },
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545"
    },
    ropsten: {
      url: `https://ropsten.infura.io/v3/${process.env.INFURA_PROJECT_KEY}`,
      chainId: 3,
      accounts: [`0x${process.env.DEPLOYER_PRIVATE_KEY1}`]
    },
    rinkeby: {
      url: `https://speedy-nodes-nyc.moralis.io/c58b6e26734d635d56e1be97/eth/rinkeby`,
      chainId: 4,
      accounts: [`0x${process.env.DEPLOYER_PRIVATE_KEY1}`]
    },
    bscMainnet: {
      url: `https://speedy-nodes-nyc.moralis.io/c58b6e26734d635d56e1be97/bsc/mainnet`, //`https://bsc-dataseed1.ninicoin.io/`
      chainId: 56,
      gas: 2100000,
      gasPrice: 8000000000,
      accounts: [
        `0x${process.env.DEPLOYER_PRIVATE_KEY1}`
      ]
    },
    bscTestnet: {
      url: `https://data-seed-prebsc-1-s1.binance.org:8545/`,
      chainId: 97,
      gas: 2100000,
      gasPrice: 12000000000,
      accounts: [
        `0x${process.env.DEPLOYER_PRIVATE_KEY1}`
      ]
    },
    mumbai: {
      url: `https://rpc-mumbai.maticvigil.com`,
      chainId: 80001,
      accounts: [`0x${process.env.DEPLOYER_PRIVATE_KEY1}`]
    },
    matic: {
      url: `https://polygon-mainnet.infura.io/v3/e79840192ef8493e93768808c8522d3a`,
      chainId: 137,
      accounts: [`0x${process.env.DEPLOYER_PRIVATE_KEY1}`]
    },
    arbitrum: {
      url: `https://arbitrum-mainnet.infura.io/v3/e79840192ef8493e93768808c8522d3a`,
      chainId: 42161,
      accounts: [`0x${process.env.DEPLOYER_PRIVATE_KEY1}`]
    },
    optimism: {
      url: `https://optimism-mainnet.infura.io/v3/e79840192ef8493e93768808c8522d3a`,
      chainId: 10,
      accounts: [`0x${process.env.DEPLOYER_PRIVATE_KEY1}`]
    },
    linea: {
      url: `https://linea-mainnet.infura.io/v3/e79840192ef8493e93768808c8522d3a`,
      chainId: 59144,
      accounts: [`0x${process.env.DEPLOYER_PRIVATE_KEY1}`]
    },
    base: {
      url: `https://base-mainnet.g.alchemy.com/v2/8ODVkj91qLptgutNh04owtlNwBHttp2o`,
      chainId: 8453,
      accounts: [`0x${process.env.DEPLOYER_PRIVATE_KEY1}`]
    },
    moonbeam: {
      url: ``,
      chainId: 1284,
      accounts: [`0x${process.env.DEPLOYER_PRIVATE_KEY1}`]
    },
    blast: {
      url: `https://blast-mainnet.infura.io/v3/e79840192ef8493e93768808c8522d3a`,
      chainId: 81457,
      accounts: [`0x${process.env.DEPLOYER_PRIVATE_KEY1}`]
    },
    evmos: {
      url: ``,
      chainId: 9001,
      accounts: [`0x${process.env.DEPLOYER_PRIVATE_KEY1}`]
    },
    kujira: {
      url: ``,
      chainId: 81457,
      accounts: [`0x${process.env.DEPLOYER_PRIVATE_KEY1}`]
    },
    axelar: {
      url: ``,
      chainId: 81457,
      accounts: [`0x${process.env.DEPLOYER_PRIVATE_KEY1}`]
    }
  },
  etherscan: {
    apiKey: process.env.POLYGONSCAN_API_KEY,
  },
};

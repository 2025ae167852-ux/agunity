require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const config = {
  solidity: "0.8.24",
  networks: {},
};

if (process.env.POLYGON_AMOY_RPC_URL) {
  config.networks.amoy = {
    url: process.env.POLYGON_AMOY_RPC_URL,
    chainId: 80002,
    accounts: process.env.DEPLOYER_PRIVATE_KEY
      ? [process.env.DEPLOYER_PRIVATE_KEY]
      : [],
  };
}

module.exports = config;
require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {    
    goerli: {
      url: "https://eth-goerli.g.alchemy.com/v2/CKF-QnQmtQp2zlgo-Q5OzvllW7WANpYF",
      accounts: ["2c93fd79f7d5fb9645ffa177741279e0160beb21de13a2a3b20cc83676cb6188"],
      chainId: 5,      
    }
  },
    etherscan: {
      apiKey: "CKF-QnQmtQp2zlgo-Q5OzvllW7WANpYF"
    },
};

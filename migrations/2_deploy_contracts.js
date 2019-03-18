var EtherWheel = artifacts.require("./EtherWheel.sol");

module.exports = function(deployer) {
  deployer.deploy(EtherWheel);
};

const { ethers } = require("hardhat");

async function main() {
  const registry = await ethers.deployContract("HarvestRegistry");
  await registry.waitForDeployment();

  console.log(`HarvestRegistry deployed to ${await registry.getAddress()}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
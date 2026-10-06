const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("HarvestRegistry", function () {
  async function deployRegistry() {
    const [producer] = await ethers.getSigners();
    const registry = await ethers.deployContract("HarvestRegistry");
    return { registry, producer };
  }

  it("registers and retrieves a harvest batch", async function () {
    const { registry, producer } = await deployRegistry();
    const batchId = ethers.id("field-001-harvest-2026");
    const metadataURI = "ipfs://example-metadata-cid";

    await expect(registry.registerBatch(batchId, metadataURI))
      .to.emit(registry, "BatchRegistered")
      .withArgs(batchId, await producer.getAddress(), metadataURI);

    const batch = await registry.getBatch(batchId);
    expect(batch.producer).to.equal(await producer.getAddress());
    expect(batch.metadataURI).to.equal(metadataURI);
    expect(batch.createdAt).to.be.greaterThan(0n);
  });

  it("rejects duplicate batch IDs", async function () {
    const { registry } = await deployRegistry();
    const batchId = ethers.id("field-001-harvest-2026");

    await registry.registerBatch(batchId, "ipfs://example-metadata-cid");
    await expect(
      registry.registerBatch(batchId, "ipfs://different-metadata-cid")
    ).to.be.revertedWith("Batch already registered");
  });
});
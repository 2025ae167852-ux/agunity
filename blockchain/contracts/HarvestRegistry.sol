// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract HarvestRegistry {
    struct Batch {
        address producer;
        string metadataURI;
        uint256 createdAt;
    }

    mapping(bytes32 => Batch) private batches;

    event BatchRegistered(
        bytes32 indexed batchId,
        address indexed producer,
        string metadataURI
    );

    function registerBatch(bytes32 batchId, string calldata metadataURI) external {
        require(batchId != bytes32(0), "Invalid batch ID");
        require(bytes(metadataURI).length > 0, "Metadata URI is required");
        require(batches[batchId].producer == address(0), "Batch already registered");

        batches[batchId] = Batch({
            producer: msg.sender,
            metadataURI: metadataURI,
            createdAt: block.timestamp
        });

        emit BatchRegistered(batchId, msg.sender, metadataURI);
    }

    function getBatch(bytes32 batchId) external view returns (Batch memory) {
        return batches[batchId];
    }
}
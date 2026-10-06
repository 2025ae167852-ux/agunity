# AGUNITY Blockchain

Starter Solidity workspace for recording harvest-batch provenance. It is a separate Hardhat project and is not yet connected to the Node.js API.

## Requirements

- Node.js 20 or newer
- npm

## Install and test

```powershell
npm install
npm test
npm run compile
```

## Deploy locally

Start a local EVM node in one terminal:

```powershell
npm run node
```

Then deploy from another terminal in this directory:

```powershell
npm run deploy:local
```

## Deploy to Polygon Amoy

Copy `.env.example` to `.env`, then set `POLYGON_AMOY_RPC_URL` and `DEPLOYER_PRIVATE_KEY`. Fund a dedicated test wallet with Amoy test POL before deployment.

```powershell
npm run deploy:amoy
```

Never use a wallet containing production funds for development. Batch metadata is public and permanent on-chain; store only non-sensitive metadata or a content hash, not personal or confidential farm data.
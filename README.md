# BitAcer - NFT Land Marketplace

BitAcer is a modern NFT-based land marketplace platform that allows users to buy, sell, and trade land parcels as NFTs with immersive 3D visualization.

## Features

- User Authentication with Web3 and Traditional Login
- NFT Minting for Land Parcels
- Interactive 3D Land Visualization
- Secure Crypto Wallet Integration
- NFT Marketplace
- Admin Dashboard
- Real-time Transaction Processing

## Tech Stack

- Frontend: Next.js, TypeScript, Three.js
- Backend: Node.js, Express
- Database: MongoDB, PostgreSQL
- Blockchain: Ethereum, Solidity
- Authentication: NextAuth.js
- Styling: TailwindCSS, Material-UI

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   Create a `.env` file with required configurations

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Smart Contracts

Smart contracts are located in the `contracts` directory. Deploy using:
```bash
npx hardhat run scripts/deploy.js --network <network>
```

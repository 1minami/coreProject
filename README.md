# Motoko bootcamp : NFT minter.

## Core project

URL　https://t5n7w-yiaaa-aaaag-aackq-cai.raw.ic0.app/

## Running the project locally

If you want to test your project locally, you can use the following commands:

```bash
# Install dependencies
npm run start

# Starts the replica
dfx start

# Deploys your canisters to the replica and generates your candid interface
dfx deploy --argument '("sample_nft","NFT")'
```

Once the job completes, your application will be available at `http://localhost:8000?canisterId={asset_canister_id}`.
Additionally, if you are making frontend changes, you can start a development server with

```bash
npm start
```

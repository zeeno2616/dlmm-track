const bs58 = require('bs58');
const { Keypair } = require('@solana/web3.js');
const { getDLMMNFTs } = require('./helius');

async function getDLMMReport(privateKey) {
  const wallet = Keypair.fromSecretKey(bs58.decode(privateKey));
  const pubkey = wallet.publicKey.toBase58();

  const nfts = await getDLMMNFTs(pubkey);

  return `Found ${nfts.length} DLMM positions for wallet ${pubkey}.\n(Parsing positions in next step...)`;
}

module.exports = { getDLMMReport };

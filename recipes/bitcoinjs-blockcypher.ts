import { script } from 'bitcoinjs-lib';
import type { Network } from 'bitcoinjs-lib';
import * as ecc from 'tiny-secp256k1';
import { ECPairFactory } from 'ecpair';
import type { TransactionSkeleton } from '../lib';

const ECPair = ECPairFactory(ecc);

export const BlockCypherNetwork: Network = {
  messagePrefix: '\x18Bitcoin Signed Message:\n',
  bech32: 'bcy',
  bip32: {
    public: 0x0488b21e,
    private: 0x0488ade4,
  },
  pubKeyHash: 0x1b,
  scriptHash: 0x1f,
  wif: 0x49,
};

export const fromWIF = (wif: string, network?: Network) =>
  ECPair.fromWIF(wif, network);

export const fromPublicKeyHex = (publicKeyHex: string, network?: Network) => {
  const publicKey = Buffer.from(publicKeyHex, 'hex');
  return ECPair.fromPublicKey(publicKey, { network });
};

export const fromPrivateKeyHex = (privateKeyHex: string, network?: Network) => {
  const privateKey = Buffer.from(privateKeyHex, 'hex');
  return ECPair.fromPrivateKey(privateKey, { network });
};

export const signTransactionSkeleton = (
  keyPairHex: {
    publicKey: string;
    privateKey: string;
    network?: Network;
  },
  transactionSkeleton: TransactionSkeleton,
) => {
  const keyPair = fromPrivateKeyHex(keyPairHex.privateKey, keyPairHex.network);
  transactionSkeleton.pubkeys = [];
  transactionSkeleton.signatures = [];

  // The hash type doesn't actually matter in this since it must be removed
  // or BlockCypher will complain
  const getSignatureHex = (dataHex: string) =>
    script.signature
      .encode(keyPair.sign(Buffer.from(dataHex, 'hex')), 0x01)
      .toString('hex')
      .slice(0, -2);

  for (const dataHex of transactionSkeleton.tosign) {
    transactionSkeleton.pubkeys.push(keyPairHex.publicKey);
    transactionSkeleton.signatures.push(getSignatureHex(dataHex));
  }
};

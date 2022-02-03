import { ecdsaSign, signatureExport } from 'secp256k1';
import type { bitcoin } from '../lib';

export const getSignatureHex = (dataHex: string, privateKeyHex: string) => {
  const { signature } = ecdsaSign(
    Buffer.from(dataHex, 'hex'),
    Buffer.from(privateKeyHex, 'hex'),
  );
  return Buffer.from(signatureExport(signature)).toString('hex');
};

// This has been tested for P2PKH transactions only
export const signTransactionSkeleton = (
  keyPairHex: {
    publicKey: string;
    privateKey: string;
  },
  transactionSkeleton: bitcoin.TransactionSkeleton,
) => {
  transactionSkeleton.pubkeys = [];
  transactionSkeleton.signatures = [];
  for (const dataHex of transactionSkeleton.tosign) {
    transactionSkeleton.pubkeys.push(keyPairHex.publicKey);
    transactionSkeleton.signatures.push(
      getSignatureHex(dataHex, keyPairHex.privateKey),
    );
  }
};

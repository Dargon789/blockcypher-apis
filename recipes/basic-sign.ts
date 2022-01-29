import { ecdsaSign, signatureExport } from 'secp256k1';
import type { TransactionSkeleton } from '../lib';

export const getSignatureHex = (dataHex: string, privateKeyHex: string) => {
  const { signature } = ecdsaSign(
    Buffer.from(dataHex, 'hex'),
    Buffer.from(privateKeyHex, 'hex'),
  );
  return Buffer.from(signatureExport(signature)).toString('hex');
};

export const signTransactionSkeleton = (
  keyPairHex: {
    publicKey: string;
    privateKey: string;
  },
  transactionSkeleton: TransactionSkeleton,
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

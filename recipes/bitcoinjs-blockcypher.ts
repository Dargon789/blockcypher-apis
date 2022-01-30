import type { TransactionSkeleton } from "blockcypher-apis";
import { script } from "bitcoinjs-lib";
import type { Network } from "bitcoinjs-lib";
import { ECPairFactory } from "ecpair";
import type { ECPairInterface } from "ecpair";
import * as ecc from "tiny-secp256k1";

const ECPair = ECPairFactory(ecc);

export const BlockCypherNetwork: Network = {
  messagePrefix: "\x18Bitcoin Signed Message:\n",
  bech32: "bcy",
  // bip32 & bip44
  bip32: {
    // B/c their bip84 prefixes align w/ the testnet prefixes
    // I assume that the same applies to bip32
    public: 0x043587cf,
    private: 0x04358394,
    //public: 0x0488b21e,
    //private: 0x0488ade4,
  },
  pubKeyHash: 0x1b,
  scriptHash: 0x1f,
  wif: 0x49,
};

export const BlockCypherNetworkBip84 = {
  public: 0x045f1cf6,
  private: 0x045f18bc,
};

export const fromWIF = (wif: string, network?: Network) =>
  ECPair.fromWIF(wif, network);

export const fromPublicKeyHex = (publicKeyHex: string, network?: Network) => {
  const publicKey = Buffer.from(publicKeyHex, "hex");
  return ECPair.fromPublicKey(publicKey, { network });
};

export const fromPrivateKeyHex = (privateKeyHex: string, network?: Network) => {
  const privateKey = Buffer.from(privateKeyHex, "hex");
  return ECPair.fromPrivateKey(privateKey, { network });
};

export const getSignatureHex = (
  keyPair: ECPairInterface,
  dataHex: string,
  hashType: number = 0x01
) =>
  script.signature
    .encode(keyPair.sign(Buffer.from(dataHex, "hex")), hashType)
    .toString("hex");

export interface SignTransactionOptions {
  keyPair: ECPairInterface;
  transactionSkeleton: TransactionSkeleton;
  network?: Network;
  /** BlockCypher automatically appends the SIGHASH_ALL OP code at the end of non-segwit transactions */
  isSegWit?: boolean;
  //* https://en.bitcoin.it/wiki/OP_CHECKSIG */
  hashType?: number;
}

export const signTransactionSkeleton = ({
  keyPair,
  transactionSkeleton,
  isSegWit,
  hashType,
}: SignTransactionOptions) => {
  if (!isSegWit && hashType)
    throw new Error(
      "Non-SegWit BlockCypher transactions can not have a hash type"
    );
  if (isSegWit && !hashType)
    throw new Error("SegWit transactions must have a hash type");
  transactionSkeleton.pubkeys = [];
  transactionSkeleton.signatures = [];
  const publicKeyHex = keyPair.publicKey.toString("hex");
  for (const dataHex of transactionSkeleton.tosign) {
    transactionSkeleton.pubkeys.push(publicKeyHex);
    let signatureHex = getSignatureHex(keyPair, dataHex, hashType);
    if (!isSegWit) signatureHex = signatureHex.slice(0, -2);
    transactionSkeleton.signatures.push(signatureHex);
  }
};

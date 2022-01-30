import assert from "assert";
import { inspect } from "util";
import { Client } from "blockcypher-apis";
import { payments } from "bitcoinjs-lib";
import { ECPairFactory } from "ecpair";
import * as ecc from "tiny-secp256k1";
import {
  BlockCypherNetwork,
  fromWIF,
  signTransactionSkeleton,
} from "./bitcoinjs-blockcypher";

const ECPair = ECPairFactor(ecc);

const coin = "bcy";
const chain = "test";
const token = process.env.BLOCKCYPHER_TOKEN;
const client = new Client({
  coin,
  chain,
  token,
});

const test = async () => {
  const keyPair = fromWIF(
    "Bs7QfLMRZYoGg7BManxsqzLZbeFJYGds6L1DRaeRsLq4u6rZaswc",
    BlockCypherNetwork
  );
  assert.strictEqual(
    keyPair.publicKey.toString("hex"),
    "02a9316e36551e3b574dac739751d71e91a25a5ca751475534a1ed0458d9668780"
  );
  const p2pkh = payments.p2pkh({
    pubkey: keyPair.publicKey,
    network: BlockCypherNetwork,
  });
  const p2wpkh = payments.p2wpkh({
    pubkey: keyPair.publicKey,
    network: BlockCypherNetwork,
  });
  assert.strictEqual(p2pkh.address, "BxbSYifHzAjjj58QMDDXRyntdbPYeVQHg1");
  assert.strictEqual(
    p2wpkh.address,
    "bcy1q80a4ws05e95pcfye3a6w5cfsjvdq6kxzht78xw"
  );

  await client.faucet(p2pkh.address, 100000);

  const txSkeleton1 = await client.apis.transaction.newTransaction({
    inputs: [{ addresses: [p2pkh.address] }],
    outputs: [{ addresses: [p2wpkh.address], value: 80000 }],
  });
  signTransactionSkeleton({
    keyPair,
    transactionSkeleton: txSkeleton1,
  });
  const txSkeletonFinal1 = await client.apis.transaction.sendTransaction(
    txSkeleton1
  );
  console.log(inspect(txSkeletonFinal1.tx, { depth: null }));

  const txSkeleton2 = await client.apis.transaction.newTransaction({
    inputs: [{ addresses: [p2wpkh.address] }],
    outputs: [{ addresses: [p2pkh.address], value: 60000 }],
  });
  signTransactionSkeleton({
    keyPair,
    transactionSkeleton: txSkeleton2,
    isSegWit: true,
    hashType: 0x01,
  });
  const txSkeletonFinal2 = await client.apis.transaction.sendTransaction(
    txSkeleton2
  );
  console.log(inspect(txSkeletonFinal2.tx, { depth: null }));
};

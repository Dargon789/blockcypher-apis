import { Client } from '../dist';

const coin = process.env.COIN;
const chain = process.env.CHAIN;
const token = process.env.TOKEN;
const privateKey = process.env.PRIVATE_KEY;
const publicKey = process.env.PUBLIC_KEY;
const inputAddress = process.env.INPUT_ADDRESS;
const outputAddress = process.env.OUTPUT_ADDRESS;
const valueInSats = 1e5;

const client = new Client({ coin, chain, token });

async function test() {
  try {
    console.log('Creating TX');
    const transactionSkeleton = await client.apis.transaction.newTransaction({
      inputs: [{ addresses: [inputAddress] }],
      outputs: [{ addresses: [outputAddress], value: valueInSats }],
    });
    console.log('Signing TX');
    const transactionSkeletonSigned =
      await client.apis.transaction.sendTransaction({
        keychain: {
          private: privateKey,
          public: publicKey,
        },
        transactionSkeleton,
      });
    console.log('Completed TX');
    console.log(transactionSkeletonSigned);
  } catch (e) {
    if (e.isAxiosError) {
      console.error(e.response?.data);
    } else console.error(e);
  }
}
test();

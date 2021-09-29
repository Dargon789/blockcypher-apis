# blockcypher-apis
> A simple BlockCypher API client made using Axios

> A majority of this API is untested because I have zero use for a lot of it, feel free to let me know any issues you come across!

And yes, it will sign your transactions. The next planned update is a function to verify webhook signatures from BlockCypher, and then jest testing.

```ts
// The function will be define as so
verifySignature(signatureHeader: string, pubKey: string)
```

However I'm having trouble finding the tools to do so, if you have any ideas feel free to share!

## Installation
```sh
yarn add blockcypher-apis
# npm i blockcypher-apis
```

## Usage
```ts
import { Client } from 'blockcypher-apis'

const client = new Client({
  coin: 'btc',
  chain: 'main',
  //token: ...
});

client.apis.transaction.getUnconfirmedTransactions()
.then(console.log)
.catch((err) => {
  if (err.isAxiosError) {
    console.error(err.response.data);
  } else console.error(err);
})



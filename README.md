# blockcypher-apis
> A simple BlockCypher API client made using Axios

> A majority of this API is untested because I have zero use for a lot of it, feel free to let me know any issues you come across!

## Installation
```sh
npm i blockcypher-apis
#yarn add blockcypher-apis
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
```


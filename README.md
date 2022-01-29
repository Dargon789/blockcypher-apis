# blockcypher-apis

> A simple BlockCypher API client made using Axios

> Some parts of this library are completely untested, primarily the assets & metadata APIs. Feel free to make an issue or send a PR and I'll get to it ASAP

## Installation

```sh
npm i blockcypher-apis
#yarn add blockcypher-apis
```

## Usage

```ts
import { Client } from 'blockcypher-apis';

const client = new Client({
  coin: 'btc',
  chain: 'main',
  //token: ...
});

client.apis.transaction
  .getUnconfirmedTransactions()
  .then(console.log)
  .catch(console.error);
```

## Recipes

Check [this directory](https://github.com/agent-ly/blockcypher-apis/tree/main/recipes) for some neat tools and integrations with other popular libraries such as [bitcoinjs-lib](https://github.com/bitcoinjs/bitcoinjs-lib)

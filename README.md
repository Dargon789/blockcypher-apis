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

// ...

const utxs = await client.apis.bitcoin.transaction.getUnconfirmedTransactions();
```

For batching:

```ts
import { Client } from 'blockcypher-apis';
import type { bitcoin } from 'blockcypher-apis';

// ...

const blocks = (await client.apis.bitcoin.blockchain.getBlockByHash(
  '1;2;3',
)) as bitcoin.Block[];
```

## Recipes

Check [this directory](https://github.com/agent-ly/blockcypher-apis/tree/main/recipes) for some neat tools and integrations with other popular libraries such as [bitcoinjs-lib](https://github.com/bitcoinjs/bitcoinjs-lib)

## TODO

- Implement ETH interface

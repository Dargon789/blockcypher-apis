export type Coin = "btc" | "dash" | "doge" | "ltc" | "bcy";
export type Chain = "main" | "test3" | "test";
export type EventType =
  | "unconfirmed-tx"
  | "new-block"
  | "confirmed-tx"
  | "tx-confirmation"
  | "double-spend-tx"
  | "tx-confidence";
export type ScriptType =
  | "pay-to-public-key-hash"
  | "pay-to-public-key"
  | "null-data"
  | "multisig"
  | "pay-to-script-hash"
  | "pay-to-witness-pubkeyhash"
  | "pay-to-witness-scripthash"
  | "witness-unknown";

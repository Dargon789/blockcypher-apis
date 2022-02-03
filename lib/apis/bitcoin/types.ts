export type EventType =
  | 'unconfirmed-tx'
  | 'new-block'
  | 'confirmed-tx'
  | 'tx-confirmation'
  | 'double-spend-tx'
  | 'tx-confidence';

export type ScriptType =
  | 'pay-to-pubkey-hash'
  | 'pay-to-multi-pubkey-hash'
  | 'pay-to-pubkey'
  | 'pay-to-script-hash'
  | `multisig-${number}-of-${number}`
  | 'null-data'
  | 'empty'
  | 'unknown';

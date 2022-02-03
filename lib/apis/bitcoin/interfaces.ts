import { EventType, ScriptType } from './types';

/** https://www.blockcypher.com/dev/bitcoin/#blockchain */
export interface Blockchain {
  name: string;
  height: number;
  hash: string;
  time: string;
  latest_url: string;
  previous_hash: string;
  previous_url: string;
  peer_count: number;
  unconfirmed_count: number;
  high_fee_per_kb: number;
  medium_fee_per_kb: number;
  low_fee_per_kb: number;
  last_fork_height: number;
  last_fork_hash: string;
}

/** https://www.blockcypher.com/dev/bitcoin/#block */
export interface Block {
  hash: string;
  height: number;
  chain: string;
  total: number;
  fees: number;
  size: number;
  vsize: number;
  ver: number;
  time: string;
  received_time: string;
  coinbase_addr: string;
  relayed_by: string;
  bits: number;
  nonce: number;
  n_tx: number;
  prev_block: string;
  mrkl_root: string;
  txids: string[];
  depth: number;
  prev_block_url: string;
  tx_url: string;
  next_txids: string;
}

/** https://www.blockcypher.com/dev/bitcoin/#txinput */
export interface TransactionInput {
  addresses?: string[];

  prev_hash?: string;
  output_index?: number;

  wallet_name?: string;
  wallet_token?: string;
  hd_path?: string;

  output_value?: number;
  script_type: ScriptType;
  script: string;
  sequence: number;
  age?: number;
}

/** https://www.blockcypher.com/dev/bitcoin/#txoutput */
export interface TransactionOutput {
  value: number;
  script: string;
  addresses: string[];
  script_type: ScriptType;
  spent_by?: string;
  data_hex?: string;
  data_string?: string;
}

/** https://www.blockcypher.com/dev/bitcoin/#tx */
export interface Transaction {
  block_height: number;
  hash: string;
  addresses: string[];
  total: number;
  fees: number;
  size: number;
  vsize: number;
  preference: 'high' | 'medium' | 'low';
  relayed_by: string;
  received: string;
  ver: number;
  lock_time: number;
  double_spend: boolean;
  vin_sz: number;
  vout_sz: number;
  confirmations: number;
  inputs: TransactionInput[];
  outputs: TransactionOutput[];
  opt_in_rbf?: boolean;
  confidence?: number;
  confirmed?: string;
  receive_count?: number;
  change_address?: string;
  block_hash?: string;
  block_index?: number;
  double_of?: string;
  data_protocol?:
    | 'blockchainid'
    | 'openassets'
    | 'factom'
    | 'colu'
    | 'coinspark'
    | 'omni';
  hex?: string;
  next_inputs?: string;
  next_outputs?: string;
}

/** https://www.blockcypher.com/dev/bitcoin/#txref */
interface TransactionReference {
  address?: string;
  block_height: number;
  tx_hash: number;
  tx_input_n: number;
  tx_output_n: number;
  value: number;
  preference: 'high' | 'medium' | 'low';
  spent: boolean;
  double_spend: boolean;
  confirmations: number;
  script?: string;
  ref_balance?: number;
  confidence?: number;
  confirmed?: string;
  spent_by?: string;
  received?: string;
  receive_count?: number;
  double_of?: string;
}

/** https://www.blockcypher.com/dev/bitcoin/#txskeleton */
export interface TransactionSkeleton {
  /** A temporary TX, usually returned fully filled but missing input scripts. */
  tx: Transaction;
  tosign: string[];
  signatures?: string[];
  pubkeys?: string[];
  tosign_tx?: string[];
  errors?: string[];
}

/** https://www.blockcypher.com/dev/bitcoin/#txconfidence */
export interface TransactionConfidence {
  age_millis: number;
  receive_count: number;
  confidence: number;
  txhash: string;
  txurl: string;
}

/** https://www.blockcypher.com/dev/bitcoin/#witnesstosigntx */
export interface WitnessToSignTransaction {
  version: number;
  hash_prevouts: string;
  hash_sequence: string;
  outpoint: string;
  outpoint_index: number;
  script_code: string;
  value: number;
  sequence: number;
  hash_outputs: string;
  lock_time: number;
  sighash_type: number;
}

/** https://www.blockcypher.com/dev/bitcoin/#addresskeychain */
export interface AddressKeychain {
  address: string;
  public: string;
  private: string;
  wif: string;
}

export interface MultiSigAddressKeychain extends AddressKeychain {
  pubkeys: string[];
  script_type: ScriptType;
}

export interface AssetAddressKeychain extends AddressKeychain {
  original_address: string;
  oap_address: string;
}

/** https://www.blockcypher.com/dev/bitcoin/#address */
export interface Address {
  address?: string;
  wallet?: Wallet & { hd?: boolean };
  total_received: number;
  total_sent: number;
  balance: number;
  unconfirmed_balance: number;
  final_balance: number;
  n_tx: number;
  unconfirmed_n_tx: number;
  final_n_tx: number;
  tx_url?: string;
  txs?: Transaction[];
  txrefs?: TransactionReference[];
  unconfirmed_txrefs?: TransactionReference[];
  hasMore?: boolean;
}

/** https://www.blockcypher.com/dev/bitcoin/#wallet */
export interface Wallet {
  token: string;
  name: string;
  addresses: string[];
}

/** https://www.blockcypher.com/dev/bitcoin/#hdaddress */
export interface HDAddress {
  address: string;
  /** Note that the path is relative.
   * For example, if your wallet was made with `m/44'/0'/0'`
   * a child with the path `m/44'/0'/0'/0`
   * will appear as `m/0`
   */
  path: string;
  public?: string;
}

/** https://www.blockcypher.com/dev/bitcoin/#hdchain*/
export interface HDChain {
  chain_addresses: HDAddress[];
  index?: number;
}

/** https://www.blockcypher.com/dev/bitcoin/#hdwallet */
export interface HDWallet extends Pick<Wallet, 'token' | 'name'> {
  chains: HDChain[];
  hd: boolean;
  extended_public_key: string;
  subchain_indexes?: number[];
}

/** https://www.blockcypher.com/dev/bitcoin/#oapissue */
export interface OAPIssue {
  from_private: string;
  to_address: string;
  amount: number;
  metdata?: string;
}

/** https://www.blockcypher.com/dev/bitcoin/#oaptx */
export interface OAPTransaction {
  ver: number;
  assetid: string;
  hash: string;
  confirmed?: string;
  received: string;
  oap_meta?: string;
  double_spend: boolean;
  inputs: TransactionInput[];
  outputs: TransactionOutput[];
}

/** https://www.blockcypher.com/dev/bitcoin/#event */
export interface Event {
  id: string;
  event: EventType;
  hash?: string;
  wallet_name?: string;
  token?: string;
  address?: string;
  confirmations?: number;
  confidence?: number;
  script?: string;
  url?: string;
  callback_errors?: number;
  signkey?: string | 'preset';
}

/** https://www.blockcypher.com/dev/bitcoin/#addressforward */
export interface AddressForward {
  id: string;
  token: string;
  destination: string;
  input_address: string;
  process_fees_address?: string;
  process_fees_percent?: number;
  process_fees_satoshis?: number;
  callback_url?: string;
  enable_confirmations?: boolean;
  mining_fees_satoshis?: number;
  txs?: string[];
}

/** https://www.blockcypher.com/dev/bitcoin/#addressforwardcallback */
export interface AddressForwardCallback {
  value: number;
  input_address: string;
  destination: string;
  input_transaction_hash: string;
  transaction_hash: string;
}

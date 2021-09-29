import { ecdsaSign, signatureExport } from 'secp256k1';
import type {
  Transaction,
  TransactionInput,
  TransactionOutput,
  TransactionSkeleton,
  TransactionConfidence,
  AddressKeychain,
  WitnessToSignTransaction,
} from '../interfaces';
import { BaseApi } from './base.api';

export interface TransactionPropogationResponse {
  transaction: string;
  first_location: AggregatedOrigin;
  first_city: string;
  first_country: string;
  aggregated_origin: AggregatedOrigin;
  aggregated_origin_radius: number;
  first_received: string;
}

export interface AggregatedOrigin {
  latitude: number;
  longitude: number;
}

/** https://www.blockcypher.com/dev/bitcoin/#transaction-api */
export class TransactionApi extends BaseApi {
  /** https://www.blockcypher.com/dev/bitcoin/#unconfirmed-transactions-endpoint */
  async getUnconfirmedTransactions(params?: {
    limit?: number;
    minValue?: number;
  }) {
    const response = await this.axios.get<Transaction[]>('/txs', { params });
    return response.data;
  }

  /** https://www.blockcypher.com/dev/bitcoin/#transaction-hash-endpoint */
  async getTransactionByHash(
    hash: string,
    params?: {
      limit?: number;
      instart?: number;
      outstart?: number;
      legacyaddrs?: boolean;
      includeHex?: boolean;
      includeConfidence?: boolean;
    },
  ) {
    const response = await this.axios.get(`/txs/${hash}`, { params });
    return response.data;
  }

  /** https://www.blockcypher.com/dev/bitcoin/#creating-transactions */
  async newTransaction(payload: {
    inputs: Pick<
      TransactionInput,
      'addresses' | 'wallet_name' | 'wallet_token'
    >[];
    outputs: Pick<TransactionOutput, 'addresses' | 'value'>[];
  }) {
    const response = await this.axios.post<TransactionSkeleton>(
      '/txs/new',
      payload,
    );
    return response.data;
  }

  /** https://www.blockcypher.com/dev/bitcoin/#creating-transactions */
  async sendTransaction({
    keychain,
    transactionSkeleton,
  }: {
    keychain: Pick<AddressKeychain, 'public' | 'private'>;
    transactionSkeleton: TransactionSkeleton;
  }) {
    transactionSkeleton.pubkeys = [];
    transactionSkeleton.signatures = [];
    for (const tosign of transactionSkeleton.tosign) {
      transactionSkeleton.pubkeys.push(keychain.public);
      transactionSkeleton.signatures.push(
        Buffer.from(this.sign(tosign, keychain.private)).toString('hex'),
      );
    }
    const response = await this.axios.post<Required<TransactionSkeleton>>(
      '/txs/send',
      transactionSkeleton,
    );
    return response.data;
  }

  /** https://www.blockcypher.com/dev/bitcoin/#push-raw-transaction-endpoint */
  async pushRawTransaction(transactionHex: string) {
    const response = await this.axios.post<Transaction>('/txs/push', {
      tx: transactionHex,
    });
    return response.data;
  }

  /** https://www.blockcypher.com/dev/bitcoin/#decode-raw-transaction-endpoint */
  async decodeRawTransaction(transactionHex: string) {
    const response = await this.axios.post<Transaction>('/txs/decode', {
      tx: transactionHex,
    });
    return response.data;
  }

  /** https://www.blockcypher.com/dev/bitcoin/#decode-transaction-witness-to-sign-endpoint */
  async decodeTransactionWitnessToSign(witnessToSignTransactionHex: string) {
    const response = await this.axios.post<WitnessToSignTransaction>(
      '/txs/decodeWitnessToSign',
      {
        witness_tosign_tx: witnessToSignTransactionHex,
      },
    );
    return response.data;
  }

  /** https://www.blockcypher.com/dev/bitcoin/#transaction-propagation-endpoint */
  async getTransactionPropogation(transactionHash: string) {
    const response = await this.axios.get<TransactionPropogationResponse>(
      `/txs/${transactionHash}/propogation`,
    );
    return response.data;
  }

  /** https://www.blockcypher.com/dev/bitcoin/#transaction-confidence-endpoint */
  async getTransactionConfidence(transactionHash: string) {
    const response = await this.axios.get<TransactionConfidence>(
      `/txs/${transactionHash}/confidence`,
    );
    return response.data;
  }

  private sign(dataHex: string, privKeyHex: string) {
    const { signature } = ecdsaSign(
      Buffer.from(dataHex, 'hex'),
      Buffer.from(privKeyHex, 'hex'),
    );
    return signatureExport(signature);
  }
}

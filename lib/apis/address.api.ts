import type {
  AddressKeychain,
  MultiSigAddressKeychain,
  Address,
} from '../interfaces';
import { BaseApi } from './base.api';

/** https://www.blockcypher.com/dev/bitcoin/#address-api */
export class AddressApi extends BaseApi {
  /** https://www.blockcypher.com/dev/bitcoin/#address-balance-endpoint */
  async getAddressBalance(
    address: string,
    params?: {
      omitWalletAddress?: boolean;
    },
  ) {
    const response = await this.axios.get<
      Omit<
        Address,
        'tx_url' | 'txs' | 'txrefs' | 'unconfirmed_txrefs' | 'hasMore'
      >
    >(`/addrs/${address}/balance`, { params });
    return response.data;
  }

  /** https://www.blockcypher.com/dev/bitcoin/#address-endpoint */
  async getAddress(
    address: string,
    params?: {
      unspentOnly?: boolean;
      includeScript?: boolean;
      includeConfidence?: boolean;
      before?: number;
      after?: number;
      limit?: number;
      confirmations?: number;
      confidence?: number;
      omitWalletAddress?: boolean;
    },
  ) {
    const response = await this.axios.get<Address>(`/addrs/${address}`, {
      params,
    });
    return response.data;
  }

  /** https://www.blockcypher.com/dev/bitcoin/#address-full-endpoint */
  async getAddressFull(
    address: string,
    params?: {
      before?: number;
      after?: number;
      limit?: number;
      txlimit?: number;
      confirmations?: number;
      confidence?: number;
      legacyaddrs?: boolean;
      includeHex?: boolean;
      includeConfidence?: boolean;
      omitWalletAddress?: boolean;
    },
  ) {
    const response = await this.axios.get<Address>(`/addrs/${address}/full`, {
      params,
    });
    return response.data;
  }

  /** https://www.blockcypher.com/dev/bitcoin/#generate-address-endpoint */
  async generateAddressKeychain(params?: { bech32?: boolean }) {
    const response = await this.axios.post<AddressKeychain>(
      '/addrs',
      undefined,
      {
        params,
      },
    );
    return response.data;
  }

  /** https://www.blockcypher.com/dev/bitcoin/#generate-multisig-address-endpoint */
  async generateMultiSigAddressKeychain(
    partialKeyChain: Pick<MultiSigAddressKeychain, 'pubkeys' | 'script_type'>,
  ) {
    const response = await this.axios.post<MultiSigAddressKeychain>(
      '/addrs',
      partialKeyChain,
    );
    return response.data;
  }
}

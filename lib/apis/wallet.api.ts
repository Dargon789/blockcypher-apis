import type { AddressKeychain, HDWallet, Wallet } from '../interfaces';
import { BaseApi } from './base.api';

/** https://www.blockcypher.com/dev/bitcoin/#wallet-api */
export class WalletApi extends BaseApi {
  /** https://www.blockcypher.com/dev/bitcoin/#create-wallet-endpoint */
  async createWallet(name: string, addresses: string[]) {
    const response = await this.axios.post<Wallet>('/wallets', {
      name,
      addresses,
    });
    return response.data;
  }

  /** https://www.blockcypher.com/dev/bitcoin/#create-wallet-endpoint */
  async createHDWallet(
    name: string,
    extended_public_key: string,
    subchain_indexes?: number[],
  ) {
    const response = await this.axios.post<HDWallet>('/wallets/hd', {
      name,
      extended_public_key,
      subchain_indexes,
    });
    return response.data;
  }

  /** https://www.blockcypher.com/dev/bitcoin/#list-wallets-endpoint */
  async listWallets() {
    const response = await this.axios.get<Wallet | HDWallet[]>('/wallets');
    return response.data;
  }

  /** https://www.blockcypher.com/dev/bitcoin/#get-wallet-endpoint */
  async getWallet(name: string) {
    const response = await this.axios.get<Wallet>(`/wallets/${name}`);
    return response.data;
  }

  /** https://www.blockcypher.com/dev/bitcoin/#get-wallet-endpoint */
  async getHDWallet(name: string) {
    const response = await this.axios.get<HDWallet>(`/wallets/hd/${name}`);
    return response.data;
  }

  /** https://www.blockcypher.com/dev/bitcoin/#add-addresses-to-wallet-endpoint */
  async addAddressesToWallet(name: string, addresses: string[]) {
    const response = await this.axios.post<Wallet>(
      `/wallets/${name}/addresses`,
      {
        addresses,
      },
    );
    return response.data;
  }

  /** https://www.blockcypher.com/dev/bitcoin/#get-wallet-addresses-endpoint */
  async getWalletAddresses(name: string) {
    const response = await this.axios.get<string[]>(
      `/wallets/${name}/addresses`,
    );
    return response.data;
  }

  /** https://www.blockcypher.com/dev/bitcoin/#get-wallet-addresses-endpoint */
  async getHDWalletAddresses(name: string) {
    const response = await this.axios.get<string[]>(
      `/wallets/hd/${name}/addresses`,
    );
    return response.data;
  }

  /** https://www.blockcypher.com/dev/bitcoin/#remove-addresses-from-wallet-endpoint */
  async removeAddressesFromWallet(name: string, addresses: string[]) {
    await this.axios.delete(`/wallets/${name}/adresses`, {
      params: { address: addresses.join(';') },
    });
  }

  /** https://www.blockcypher.com/dev/bitcoin/#generate-address-in-wallet-endpoint */
  async generateAddressInWallet(name: string, bech32?: boolean) {
    const response = await this.axios.post<Wallet & AddressKeychain>(
      `/wallets/${name}/addresses/generate`,
      undefined,
      {
        params: { bech32 },
      },
    );
    return response.data;
  }

  /** https://www.blockcypher.com/dev/bitcoin/#derive-address-in-wallet-endpoint */
  async deriveAddressInWallet(
    name: string,
    params?: { count?: number; subchain_index?: number; lookahead?: number },
  ) {
    const response = await this.axios.post<Pick<HDWallet, 'chains'>>(
      `/wallets/hd/${name}/addresses/derive`,
      undefined,
      {
        params,
      },
    );
    return response.data;
  }

  /** https://www.blockcypher.com/dev/bitcoin/#delete-wallet-endpoint */
  async deleteWallet(name: string) {
    await this.axios.delete(`/wallets/${name}`);
  }

  /** https://www.blockcypher.com/dev/bitcoin/#delete-wallet-endpoint */
  async deleteHDWallet(name: string) {
    await this.axios.delete(`/wallets/hd/${name}`);
  }
}

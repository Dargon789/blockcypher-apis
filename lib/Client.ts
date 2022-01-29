import Axios, { AxiosInstance } from 'axios';
import type { Chain, Coin } from './types';
import * as Apis from './apis';

export interface ClientOptions {
  coin: Coin;
  chain: Chain;
  token?: string;
}

export interface FaucetResponse {
  tx_ref: string;
}

export interface TokenLimitsResponse {
  token: string;
  limits: {
    'api/hour': number;
    'api/second': number;
    'hooks/hour': number;
    'confidence/hour': number;
    hooks: number;
    payments: number;
  };
  hits: {
    'api/hour': number;
    'hooks/hour': number;
    'confidence/hour': number;
  };
  hits_history: {
    'api/hour': number;
    'confidence/hour'?: number;
    time: string;
    hooks: number;
    'hooks/hour'?: number;
  }[];
}

/**
 * As per BlockCypher standards, all amounts are in satoshis!
 *
 * I've left some other useful notes around about certain
 * intricacies of BlockCypher
 */
export class Client {
  public readonly axios: AxiosInstance;
  public readonly apis: {
    blockchain: Apis.BlockchainApi;
    address: Apis.AddressApi;
    wallet: Apis.WalletApi;
    transaction: Apis.TransactionApi;
    metadata: Apis.MetadataApi;
    asset: Apis.AssetApi;
    addressForwarding: Apis.AddressForwardingApi;
    webhook: Apis.WebhookApi;
  };

  constructor(private readonly clientOptions: ClientOptions) {
    this.axios = Axios.create({
      baseURL: `https://api.blockcypher.com/v1/${clientOptions.coin}/${clientOptions.chain}`,
      params: { token: clientOptions.token },
    });

    this.apis = {
      blockchain: new Apis.BlockchainApi(this),
      address: new Apis.AddressApi(this),
      wallet: new Apis.WalletApi(this),
      transaction: new Apis.TransactionApi(this),
      metadata: new Apis.MetadataApi(this),
      asset: new Apis.AssetApi(this),
      addressForwarding: new Apis.AddressForwardingApi(this),
      webhook: new Apis.WebhookApi(this),
    };
  }

  async faucet(address: string, amount: number) {
    if (
      this.clientOptions.coin !== 'bcy' &&
      this.clientOptions.coin !== 'btc'
    ) {
      throw new Error('Unsupported coin');
    }
    if (
      this.clientOptions.chain !== 'test' &&
      this.clientOptions.chain !== 'test3'
    ) {
      throw new Error('Unsupported chain');
    }
    if (amount > 1e8) throw new Error('Amount too large');
    const response = await this.axios.post<FaucetResponse>('/faucet', {
      address,
      amount,
    });
    return response.data;
  }

  async getTokenLimits() {
    if (!this.clientOptions.token)
      throw new Error('You must include a token to use this method');
    const response = await this.axios.get<TokenLimitsResponse>(
      `/tokens/${this.clientOptions.token}`,
      {
        baseURL: 'https://api.blockcypher.com/v1',
      },
    );
    return response.data;
  }
}

import type { Blockchain, Block } from '../interfaces';
import { BaseApi } from './base.api';

export interface BlockchainParams {
  txstart?: number;
  limit?: number;
}

/** https://www.blockcypher.com/dev/bitcoin/#blockchain-api */
export class BlockchainApi extends BaseApi {
  /** https://www.blockcypher.com/dev/bitcoin/#chain-endpoint */
  public async getBlockchain() {
    const response = await this.axios.get<Blockchain>('/');
    return response.data;
  }

  /** https://www.blockcypher.com/dev/bitcoin/#block-hash-endpoint */
  public async getBlockByHash(hash: string, params?: BlockchainParams) {
    const response = await this.axios.get<Block>(`/blocks/${hash}`, { params });
    return response.data;
  }

  /** https://www.blockcypher.com/dev/bitcoin/#block-height-endpoint */
  public async getBlockByHeight(height: number, params?: BlockchainParams) {
    const response = await this.axios.get<Block>(`/blocks/${height}`, {
      params,
    });
    return response.data;
  }
}

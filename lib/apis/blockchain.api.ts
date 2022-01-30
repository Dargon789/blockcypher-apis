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
    return this.axios.get<Blockchain>('/');
  }

  /** https://www.blockcypher.com/dev/bitcoin/#block-hash-endpoint */
  public async getBlockByHash(hash: string, params?: BlockchainParams) {
    return this.axios.get<Block>(`/blocks/${hash}`, { params });
  }

  /** https://www.blockcypher.com/dev/bitcoin/#block-height-endpoint */
  public async getBlockByHeight(height: number, params?: BlockchainParams) {
    return this.axios.get<Block>(`/blocks/${height}`, { params });
  }
}

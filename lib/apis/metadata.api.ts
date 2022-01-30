import { BaseApi } from './base.api';

export type Metadata = Record<string, string | number>;

export type MetadataType = 'addrs' | 'txs' | 'blocks';

export interface MetadataParams {
  private?: boolean;
}

/** https://www.blockcypher.com/dev/bitcoin/#metadata-api */
export class MetadataApi extends BaseApi {
  /** https://www.blockcypher.com/dev/bitcoin/#get-metadata-endpoint */
  async getMedata(type: MetadataType, value: string, params?: MetadataParams) {
    const response = await this.axios.get<Metadata>(`${type}/${value}/meta`, {
      params,
    });
    return response.data;
  }

  /** https://www.blockcypher.com/dev/bitcoin/#put-metadata-endpoint */
  async putMetadata(
    type: MetadataType,
    value: string,
    metadata: Metadata,
    params?: MetadataParams,
  ) {
    await this.axios.put<Metadata>(`${type}/${value}/meta`, metadata, {
      params,
    });
  }

  /** https://www.blockcypher.com/dev/bitcoin/#delete-metadata-endpoint */
  async deleteMetadata(type: MetadataType, value: string) {
    await this.axios.delete(`${type}/${value}/meta`);
  }
}

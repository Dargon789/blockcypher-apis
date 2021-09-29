import { BaseApi } from './base.api';

export type Metadata = Record<string, string | number>;

export type MetadataType = 'addrs' | 'txs' | 'blocks';

/** https://www.blockcypher.com/dev/bitcoin/#metadata-api */
export class MetadataApi extends BaseApi {
  /** https://www.blockcypher.com/dev/bitcoin/#get-metadata-endpoint */
  async getMedata(type: MetadataType, value: string, isPrivate?: boolean) {
    const response = await this.axios.get<Metadata>(`${type}/${value}/meta`, {
      params: { private: isPrivate },
    });
    return response.data;
  }

  /** https://www.blockcypher.com/dev/bitcoin/#put-metadata-endpoint */
  async putMetadata(
    type: MetadataType,
    value: string,
    metadata: Metadata,
    isPrivate?: boolean,
  ) {
    await this.axios.put<Metadata>(`${type}/${value}/meta`, metadata, {
      params: { private: isPrivate },
    });
  }

  /** https://www.blockcypher.com/dev/bitcoin/#delete-metadata-endpoint */
  async deleteMetadata(type: MetadataType, value: string) {
    await this.axios.delete(`${type}/${value}/meta`);
  }
}

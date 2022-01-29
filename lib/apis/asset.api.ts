import type {
  Address,
  AssetAddressKeychain,
  OAPIssue,
  OAPTransaction,
} from '../interfaces';
import { BaseApi } from './base.api';

/** https://www.blockcypher.com/dev/bitcoin/#asset-api */
export class AssetApi extends BaseApi {
  /** https://www.blockcypher.com/dev/bitcoin/#generate-asset-address-endpoint */
  async generateAssetAddressKeychain() {
    const response = await this.axios.post<AssetAddressKeychain>('/oap/addrs');
    return response.data;
  }

  /** https://www.blockcypher.com/dev/bitcoin/#issue-asset-endpoint */
  async issueAsset(oapIssue: OAPIssue) {
    const response = await this.axios.post<OAPTransaction>(
      '/oap/issue',
      oapIssue,
    );
    return response.data;
  }

  /** https://www.blockcypher.com/dev/bitcoin/#transfer-asset-endpoint */
  async transferAsset(assetId: string, oapIssue: OAPIssue) {
    const response = await this.axios.post<OAPTransaction>(
      `/oap/${assetId}/transfer`,
      oapIssue,
    );
    return response.data;
  }

  /** https://www.blockcypher.com/dev/bitcoin/#list-asset-txs-endpoint */
  async listAssetTransactionHashes(assetId: string) {
    const response = await this.axios.get<string[]>(`/oap/${assetId}/txs`);
    return response.data;
  }

  /** https://www.blockcypher.com/dev/bitcoin/#get-asset-tx-endpoint */
  async getAssetTransaction(assetId: string, transactionHash: string) {
    const response = await this.axios.get<OAPTransaction>(
      `/oap/${assetId}/txs/${transactionHash}`,
    );
    return response.data;
  }

  /** https://www.blockcypher.com/dev/bitcoin/#get-asset-address-endpoint */
  async getAssetAddress(assetId: string, address: string) {
    const response = await this.axios.get<Address>(
      `/oap/${assetId}/addrs/${address}`,
    );
    return response.data;
  }
}

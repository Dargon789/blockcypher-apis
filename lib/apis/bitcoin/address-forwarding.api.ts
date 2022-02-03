import { BaseApi } from '../base.api';
import type { AddressForward } from './interfaces';

/** https://www.blockcypher.com/dev/bitcoin/#address-forwarding */
export class AddressForwardingApi extends BaseApi {
  /** https://www.blockcypher.com/dev/bitcoin/#create-forward-endpoint */
  async createForward(
    payload: Omit<AddressForward, 'id' | 'token' | 'input_address' | 'txs'>,
  ) {
    const response = await this.axios.post<AddressForward>('/forwards', {
      ...payload,
      token: this.axios.defaults.params.token,
    });
    return response.data;
  }

  /** https://www.blockcypher.com/dev/bitcoin/#list-payments-endpoint */
  async listForwards(start?: number) {
    const response = await this.axios.get<AddressForward[]>('/forwards', {
      params: { start },
    });
    return response.data;
  }

  /** https://www.blockcypher.com/dev/bitcoin/#delete-payment-endpoint */
  async deleteForward(forwardID: string) {
    await this.axios.delete<AddressForward>(`/forwards/${forwardID}`);
  }
}

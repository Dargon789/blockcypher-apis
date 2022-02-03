import { BaseApi } from '../base.api';
import type { Event } from './interfaces';

/** https://www.blockcypher.com/dev/bitcoin/#using-webhooks */
export class WebhookApi extends BaseApi {
  async createWebhook(event: Partial<Event>) {
    const response = await this.axios.post<Event>('/hooks', event);
    return response.data;
  }

  async listWebhooks() {
    const response = await this.axios.get<Event[]>('/hooks');
    return response.data;
  }

  async getWebhook(webhookID: string) {
    const response = await this.axios.get<Event>(`/hooks/${webhookID}`);
    return response.data;
  }

  async deleteWebhook(webhookID: string) {
    await this.axios.delete(`/hooks/${webhookID}`);
  }

  /*async verifyWebhook(pub: string, sig: string) {}*/
}

import type { AxiosInstance } from 'axios';
import type { Client } from '../Client';

export abstract class BaseApi {
  axios: AxiosInstance;

  constructor(protected readonly client: Client) {
    this.axios = client.axios;
  }
}

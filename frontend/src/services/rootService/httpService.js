import axios from 'axios';
import { getHeaders } from './../headers'

const address = process.env.REACT_APP_ADDRESS

export class HttpService {
  constructor() {
    this.httpModule = axios;
  }
  async get(route) {
    const response = await this.httpModule.get(`${address}${route}`);
    return response.data;
  }
  async post(route, body) {
    const headers = await getHeaders()
    const response = await this.httpModule.post(`${address}${route}`, body, headers);
    return response.data;
  }
  async put(route, body) {
    const headers = await getHeaders()
    const response = await this.httpModule.put(`${address}${route}`, body, headers);
    return response.data;
  }
  async delete(route) {
    const headers = await getHeaders()
    const response = await this.httpModule.delete(`${address}${route}`, headers);
    return response.data;
  }
}

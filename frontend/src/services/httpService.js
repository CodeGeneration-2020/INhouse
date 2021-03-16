import axios from 'axios';

class HttpService {
  constructor(httpModule) {
    this.httpModule = httpModule;
  }
  async get(url) {
    const response = await this.httpModule.get(url);
    return response.data;
  }
  async post(url, body) {
    const response = await this.httpModule.post(url, body);
    return response.data;
  }
  async put(url, body) {
    const response = await this.httpModule.put(url, body);
    return response.data;
  }
  async delete(url) {
    const response = await this.httpModule.delete(url);
    return response.data;
  }
}

export default new HttpService(axios);

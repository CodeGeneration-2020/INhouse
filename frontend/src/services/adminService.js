import axios from "axios";
import { HttpService } from "./httpService";
import { routes } from "./adminRoutes";

class UserService extends HttpService {
  constructor() {
    super(axios)
  }

  getMetrics(service) {
    const route = routes[this.getMetrics.name];
    return this.post(route, service)
  }

  getLinkedinCount() {
    const route = routes[this.getLinkedinCount.name]
    return this.post(route)
  }
}

export default new UserService(axios);

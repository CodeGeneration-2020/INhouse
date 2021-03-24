import axios from "axios";
import { HttpService } from "../rootService/httpService";
import { routes } from "./adminRoutes";

class AdminService extends HttpService {
  constructor() {
    super(axios)
  }

  getMetrics(service) {
    const route = routes[this.getMetrics.name];
    return this.post(route, service)
  }

  getUserRequestedAnalysis(userId) {
    const route = routes[this.getUserRequestedAnalysis.name]
    return this.post(route, { userId })
  }

  getLinkedinCount() {
    const route = routes[this.getLinkedinCount.name]
    return this.post(route)
  }

  getUsers() {
    const route = routes[this.getUsers.name]
    return this.post(route, { limit: 10000 })
  }

  deleteUser(id) {
    const route = routes[this.deleteUser.name]
    return this.post(route, { id })
  }

  getPre() {
    const hardcodedData = [
      { userId: '1', text: 'hello', createdAt: '18:00' },
      { userId: '2', text: 'hi', createdAt: '12:00' },
    ]
    return hardcodedData;
  }
}

export default AdminService;

import { HttpService } from "../httpService";
import { routes } from "./adminRoutes";

class AdminService extends HttpService {
  getMetrics(service) {
    return this.post(routes.getMetrics, service)
  }

  getUserRequestedAnalysis(userId) {
    return this.post(routes.getUserRequestedAnalysis, { userId })
  }

  getLinkedinCount() {
    return this.post(routes.getLinkedinCount)
  }

  getUsers(params) {
    const body = {};

    if (params?.queryKey[1]) {
      body.search = {
        username: params.queryKey[1]
      };
    }

    return this.post(routes.getUsers, body)
  }

  deleteUser(id) {
    return this.post(routes.deleteUser, { id })
  }

  getAllRecognized(params) {
    const body = {};

    if (params.queryKey[1]) {
      body.search = {
        username: params.queryKey[1]
      };
    }

    return this.post(routes.getAllRecognized, body);
  }

  getAllSales(params) {
    const body = {
      paginate: {
        limit: 1000,
        offset: 0
      }
    };

    if (params.queryKey[1]) {
      body.search = {
        text: params.queryKey[1]
      };
    }

    return this.post(routes.getAllSales, body)
  }

  createSales(salesValues) {
    return this.post(routes.createSales, { dialog: salesValues })
  }
}

export default AdminService;

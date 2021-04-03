import { HttpService } from "../httpService";
import { routes } from "./adminRoutes";
import fileDownload from 'js-file-download';

class AdminService extends HttpService {
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

  getUsers(params) {
    const route = routes[this.getUsers.name]
    if (params?.queryKey[1]) {
      return this.post(route, {
        search: {
          username: params.queryKey[1]
        }
      })
    }
    return this.post(route, {})
  }

  deleteUser(id) {
    const route = routes[this.deleteUser.name]
    return this.post(route, { id })
  }

  getAllRecognized(params) {
    const route = routes[this.getAllRecognized.name]
    if (params.queryKey[1]) {
      return this.post(route, {
        search: {
          username: params.queryKey[1]
        }
      })
    }
    return this.post(route, {});
  }

  getAllSales(params) {
    const route = routes[this.getAllSales.name]
    if (params.queryKey[1]) {
      return this.post(route, {
        search: {
          text: params.queryKey[1]
        }
      })
    }
    return this.post(route, {})
  }

  downloadAudio(id) {
    const route = routes[this.downloadAudio.name]
    this
      .post(route, { id }, { responseType: 'blob' })
      .then(res => fileDownload(res, 'audio.wav'))
  }
}

export default AdminService;

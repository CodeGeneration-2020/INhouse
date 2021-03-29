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

  getUsers() {
    const route = routes[this.getUsers.name]
    return this.post(route, { limit: 10000 })
  }

  deleteUser(id) {
    const route = routes[this.deleteUser.name]
    return this.post(route, { id })
  }

  getAllRecognized() {
    const route = routes[this.getAllRecognized.name]
    return this.post(route, { limit: 9999 });
  }

  getAllSales() {
    const route = routes[this.getAllSales.name]
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

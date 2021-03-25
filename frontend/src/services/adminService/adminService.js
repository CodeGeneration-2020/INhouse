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

  getAllRecognized() {
    const route = routes[this.getAllRecognized.name]
    return this.post(route, { limit: 9999 });
  }

  getAllSales() {
    const route = routes[this.getAllSales.name]
    const mockedSales = [
      {
        context: "The end, and just as well.",
        question: "What is the end?",
        answer: "end",
        objectID: "2873515002"
      },
      {
        context: "More, a little more text.",
        question: "What is more text?",
        answer: "text",
        objectID: "2873514002"
      }
    ]
    return mockedSales
  }
}

export default AdminService;

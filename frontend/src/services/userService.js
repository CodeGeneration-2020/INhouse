import axios from "axios";
import { HttpService } from "./httpService";
import { routes } from "./userRoutes";

class UserService extends HttpService {
  constructor() {
    super(axios)
  }

  createHumantic(linkedInUrl) {
    const route = routes[this.createHumantic.name];
    return this.post(route, { linkedInUrl })
  }

  questionRecognition(blob) {
    const route = routes[this.questionRecognition.name];
    const form = new FormData()
    form.append('input', blob)
    return this.post(route, form)
  }

  getAnswer(question) {
    const route = routes[this.getAnswer.name]
    return this.post(route, { question })
  }
}

export default new UserService(axios);
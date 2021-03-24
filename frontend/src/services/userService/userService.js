import axios from "axios";
import { HttpService } from "../rootService/httpService";
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

  uploadPdf(file) {
    const route = routes[this.uploadPdf.name]
    const form = new FormData()
    form.append('input', file)
    return this.post(route, form)
  }
}

export default UserService;

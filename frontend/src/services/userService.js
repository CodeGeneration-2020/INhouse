import axios from "axios";
import { HttpService } from "./httpService";
import { routes } from "./routes";

class UserService extends HttpService {
  constructor() {
    super(axios)
  }

  createHumantic(linkedInUrl) {
    const body = { linkedInUrl }
    const route = routes[this.createHumantic.name];

    return this.post(route, body)
  }

  createRecognition(blob) {
    const route = routes[this.createRecognition.name];
    const form = new FormData()
    form.append('input', blob)
    
    return this.post(route, form)
  }

}

export default new UserService(axios);
import { HttpService } from "../httpService";
import { routes } from "./userRoutes";

class UserService extends HttpService {
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

  async getAnswer(values) {
    const route = routes[this.getAnswer.name]
    const res = values.questions.map(question => this.post(route, { question, relatedTo: values.userId }))
    return Promise.all(res);
  }

  uploadPdf(values) {
    const { file, userId } = values
    const route = `${routes[this.uploadPdf.name]}${userId}`
    const form = new FormData()
    form.append('file', file)
    return this.post(route, form)
  }
}

export default UserService;

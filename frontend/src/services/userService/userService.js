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
    const answers = values.questions.map(async question => {
      const response = await this.post(route, { question, relatedTo: values.userId })
      const result = { ...response, transcript: question }
      console.log(result)
      return result
    })
    return Promise.all(answers);
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

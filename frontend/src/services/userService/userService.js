import { HttpService } from "../httpService";
import { routes } from "./userRoutes";

class UserService extends HttpService {
  createHumantic(linkedInUrl) {
    return this.post(routes.createHumantic, { linkedInUrl })
  }

  questionRecognition(blob) {
    const form = new FormData()
    form.append('input', blob)
    return this.post(routes.questionRecognition, form)
  }

  async getAnswer(values) {
    const res = values.questions.map(question => this.post(routes.getAnswer, { question, relatedTo: values.userId }))
    return Promise.all(res);
  }

  uploadPdf(values) {
    const { file, userId } = values

    const searchParams = new URLSearchParams({
      relatedTo: userId
    });

    const url = `${routes.uploadPdf}?${searchParams}`;

    const form = new FormData()

    form.append('file', file)

    return this.post(url, form)
  }
}

export default UserService;

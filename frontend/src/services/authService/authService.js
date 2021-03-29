import { HttpService } from "../httpService";
import { routes } from "./authRoutes";

class AuthService extends HttpService {
  register(formValues) {
    const route = routes[this.register.name]
    this.post(route, formValues)
  }

  async login(formValues) {
    const route = routes[this.login.name]
    const data = await this.post(route, formValues)
    localStorage.setItem('token', data.access_token);
    localStorage.setItem('username', formValues.username);
  }
}

export default AuthService;

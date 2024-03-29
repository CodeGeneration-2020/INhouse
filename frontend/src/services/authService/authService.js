import { HttpService } from "../httpService";
import { routes } from "./authRoutes";

class AuthService extends HttpService {
  async auth(authValues) {
    const route = routes[authValues.authType]
    const data = await this.post(route, authValues.formValues)
    if (authValues.authType === 'login') {
      localStorage.setItem('token', data.access_token);
      localStorage.setItem('username', authValues.formValues.username);
    }
  }
  roleCheck() {
    return this.post(routes.roleCheck, {})
  }
}

export default AuthService;

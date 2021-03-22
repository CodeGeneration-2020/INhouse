import { BUTTONS, TEXTS } from "../../helpers/constants/constants";

export const strategy = {
  register: {
    header: TEXTS.registerHeader,
    button: BUTTONS.register,
    question: TEXTS.questionRegister,
    questionLink: '/login',
    endpoint: 'register',
    link: '/login'
  },
  login: {
    header: TEXTS.loginHeader,
    button: BUTTONS.login,
    question: TEXTS.questionLogin,
    questionLink: '/register',
    endpoint: 'login',
    link: '/',
  },
  add: {
    header: TEXTS.addHeader,
    button: BUTTONS.add,
    endpoint: 'register',
    link: '/admin_panel',
  },
  user: {
    start: BUTTONS.start,
    stop: BUTTONS.stop,
    send: BUTTONS.send,
  }
}
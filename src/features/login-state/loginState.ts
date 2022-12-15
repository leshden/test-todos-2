import { observable, runInAction } from "mobx"
import { useLocalObservable } from "mobx-react-lite"
import axios from "axios";
import {User, LoginState} from '../../interfaces/Auth';
import {loginUser} from '../requests/requests';

const loginState =  observable({
  login: false,
  access_token: '',
  email: '',
  error: ''
} as LoginState);

export const isLogin = () => loginState.login;

export const loginU = async (user: User) => {
  const response = await loginUser(user);
  if (response) {
    runInAction(() => {
      loginState.access_token = response.access_token;
      loginState.email = response.email;
      loginState.login = true;
      loginState.error = null;
    })

    console.log("");
  }
}

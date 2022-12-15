import axios from "axios";
import {User, LoginState} from '../../interfaces/Auth';

export const loginUser = async (user: User): Promise<LoginState | null> => {
    try {
      const { email, password } = user
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email, password
      });
      return response.data;
    } catch (error) {
      return null;
    }
}

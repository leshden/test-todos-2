import axios from "axios";
import {User, LoginState} from '../../interfaces/Auth';
import {TodoItem, TodoItems} from '../../interfaces/TodoItem';

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

export const registerUser = async (user: User): Promise<LoginState | null> => {
    try {
      const { email, password } = user
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        email, password
      });
      return response.data;
    } catch (error) {
      return null;
    }
}

export const getTodoListUser = async (email: string): Promise<TodoItems | null> => {
    try {
      const response = await axios.get('http://localhost:5000/api/todos/get', {
        params: {
          email: email
        }
      });
      return response.data;
    } catch (error) {
      return null;
    }
}

export const addTodoUser = async (email: string, text: string): Promise<TodoItems | null> => {
    try {
      const response = await axios.post('http://localhost:5000/api/todos/add', {
        email, text
      });
      return response.data;
    } catch (error) {
      return null;
    }
}

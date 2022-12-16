import { observable, runInAction } from "mobx"
import {TodoItem, TodoItems} from '../../interfaces/TodoItem';
import {getTodoListUser, addTodoUser} from '../requests/requests';
import {getEmail} from '../login-state/loginState';

let todos  = observable<TodoItem>([]);

export const getTodos = () => todos;

export const getTodoList = async () => {
  const response = await getTodoListUser(getEmail());
  if (response) {
    runInAction(() => {

      todos.clear();
      response.todos.forEach(element => {
        todos.push(element);
      });


    })

    console.log("Get Todo List");
  }
}

export const addTodoList = async (text : string ) => {
  const response = await addTodoUser(getEmail(), text);
  if (response) {
    runInAction(() => {
      todos.clear();
      response.todos.forEach(element => {
        todos.push(element);
      });

    })

    console.log("Add Todo List");
  }
}

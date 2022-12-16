import { observable, runInAction } from "mobx"
import {TodoItem, TodoItems} from '../../interfaces/TodoItem';
import {getTodoListUser, addTodoUser} from '../requests/requests';
import {getEmail} from '../login-state/loginState';

let todos  = observable<TodoItem>([]);


let todosState: Array<TodoItem> = observable([]);

export const getTodos = () => todos;

export const getTodoList = async () => {
  const response = await getTodoListUser(getEmail());
  if (response) {
    runInAction(() => {
      //todos.clear();
      //todosState.replace(response.todos);
      console.log('--todos ----');
      //console.log(todosState);
      console.log('--todos end----');
      let res: Array<TodoItem> = [];
      response.todos.forEach(element => {
        res.push(element);
        //todosState.push(element);
      });
      todos.replace(res);
      //console.log(todos);
    })

    console.log("Get Todo List");
  }
}

export const addTodoList = async (text : string ) => {
  const response = await addTodoUser(getEmail(), text);
  if (response) {
    runInAction(() => {
      //todos.clear();
      //response.todos.forEach(element => {
        //todos.push(element);
      //});
      console.log(response);
    })

    console.log("Add Todo List");
  }
}

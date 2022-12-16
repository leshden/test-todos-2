import {useEffect} from 'react';
import TodoItemPanel from '../todo-item-panel/TodoItemPanel';
import {TodoItem} from '../../interfaces/TodoItem';
import {getTodoList, getTodos} from '../../features/todo-state/todoState';
import { observer } from "mobx-react";

const TodoList = () => {

  useEffect(()=> {
    getTodoList();
  }, [])

  console.log('TODOLIST');
  console.log(getTodos());

  return (
    <>
      { getTodos().map(todo => {
        return (  <TodoItemPanel item = {todo} /> )
      })}
    </>
  );
}

export default TodoList;

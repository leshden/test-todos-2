import {useEffect} from 'react';
import TodoItemPanel from '../todo-item-panel/TodoItemPanel';
import {TodoItem} from '../../interfaces/TodoItem';
import {getTodoList, getTodos} from '../../features/todo-state/todoState';
import { observer } from "mobx-react";
import {Observer} from "mobx-react-lite";

const TodoList = () => {

  useEffect(()=> {
    getTodoList();
  }, [])

  const ShowList = observer(() => {
    if (getTodos().length) {
      return (
        <div>
        <>
          { getTodos().map(todo => {
            return ( <TodoItemPanel item = {todo} key = {todo.text} />)
          })}
        </>
      </div>
    )

    } else {
      return null;
    }
  });

  return <ShowList />

}

export default TodoList;

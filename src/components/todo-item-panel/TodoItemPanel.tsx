import {useState} from 'react';
import {TodoItem} from '../../interfaces/TodoItem';

import './TodoItemPanel.css';

const TodoItemPanel = ( {item} : {item : TodoItem}) => {
  //const {todos, setTodos} = useContext(TodoContext);
  const {text, active} = item;
  const [complete, setComplete] = useState(!active);
  console.log("TodoItemPanel!!!!");
  const styleMark = complete ? 'item-mark-todo-completed' : 'item-mark-todo-active';
  const styleText = complete ? 'item-text-todos-complete' : 'item-text-todos-active';
  const symbolOk = complete ? '\u2714' : '';

  const handleItemClick = () => {
    setComplete(!complete);
    //setTodos(todos.map(todo => { return {text: todo.text, active: text===todo.text ? complete : todo.active} }));
  }

  return (
    <div className='item-container-todos'>
      <div className='item-mark-container-todo'>
        <div role='change-status' className={styleMark} onClick={handleItemClick}>
          {symbolOk}
        </div>
      </div>
      <div className={styleText}> {text} </div>
    </div>
  );
}

export default TodoItemPanel;

import './FooterPanel.css'
import {useContext} from 'react';
import FilterPanel from '../filter-panel/FilterPanel';
//import {TodoContext} from '../../contexts/TodoContext';

const FooterPanel = () => {
  //const {todos, setTodos} = useContext(TodoContext);

  const handleClearCompleted = () => {
    //setTodos(todos.filter(todo => todo.active === true));
  }

  return (
    <div className='footer-container-todos'>
      <div className='footer-todos'>
        <div className='items-left-todo'>
          items left
        </div>
        <div className='filter-button-container-todo'>
          <FilterPanel />
        </div>
        <button className='clear-completed-container-todo' onClick={handleClearCompleted}>
          Clear completed
        </button>
      </div>
      <div className='footer-fake-page-todos' />
      <div className='footer-fake-second-page-todos' />
    </div>
  );
}

export default FooterPanel;

import {useState} from 'react';
import {addTodoList} from '../../features/todo-state/todoState'
import './EnterPanel.css'

const EnterPanel = () => {
  const [inputText, setInputText] = useState('');
  //const {todos, setTodos} = useContext(TodoContext);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (inputText === '') {
        alert('Empty todo!');
        return;
      }

      // const hasText = todos.filter(todo => todo.text === inputText);
      // if (hasText.length > 0) {
      //   alert('Todo already exist!');
      //   return;
      // }
      //
      // setTodos((todos) => [...todos, {text: inputText, active: true}]);
      addTodoList(inputText);
      setInputText('');
    }
  }

  const onChangeInputText = (event : React.ChangeEvent<HTMLInputElement>) => {
      setInputText(event.target.value);
  }

  return (
    <div className='enter-todos'>
      <div className='down-pointing-angle-container-todo'>
        <div className='down-pointing-angle-todo'>&#x2771;</div>
      </div>
      <input type="text" className='enter-text-todos' value = {inputText} onChange={onChangeInputText}
             placeholder='What needs to be done? And Enter' onKeyDown={handleKeyDown} />
    </div>
  );
}

export default EnterPanel;

import { Link } from "react-router-dom";
import {isLogin} from '../../features/login-state/loginState';
import { observer } from "mobx-react";
import {Observer} from "mobx-react-lite";
import EnterPanel from '../enter-panel/EnterPanel'
import FooterPanel from '../footer-panel/FooterPanel';
import TodoList from '../todo-list/TodoList'
import './Home.css';

const Home = () => {


  const Auth = () => {
    return (
      <div className='home-no-login-container'>
        <h1 className='home-no-login-title'>Добро пожаловать</h1>
        <p>Для входа в <strong>Список дел</strong> необходима <Link to='/login'>Авторизация</Link></p>
        <p>Если у вас еще нет аккаунта, то нужна <Link to='/register'>Регистрация</Link> </p>
      </div>
    );
  }


  const TodoListBody = () => {
    return (
      <div className='home-container'>
        <EnterPanel />
        <TodoList />
        <FooterPanel />
      </div>
    );
  }

  const LoginOrNot = observer(() => {
    if (isLogin()) {
      return <TodoListBody />
    } else {
      return <Auth />
    }
  });

  return <LoginOrNot/>;
}

export default Home;

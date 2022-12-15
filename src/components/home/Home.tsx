import { Link } from "react-router-dom";
import {isLogin} from '../../features/login-state/loginState';
import { observer } from "mobx-react";
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

  const TodoList = () => {
    return (
      <div className='home-container'>
        TodoList!
      </div>
    );
  }

  const LoginOrNot = observer(() => {
    if (isLogin()) {
      return <TodoList />
    } else {
      return <Auth />
    }
  });

  return <LoginOrNot/>;
}

export default Home;

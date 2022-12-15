import './Header.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import {useAppDispatch} from '../../app/store';
import {logout} from '../../features/login-state/loginStateSlice';
import {loginU} from '../../features/login-state/loginState';
import {isLogin} from '../../features/login-state/loginState';
import { observer } from "mobx-react"
//import { Observer } from'mobx-react-lite'

const Header = () => {

  const { login } = useSelector((state: RootState) => state.login)
  const dispatch = useAppDispatch();

  const logoutOnClick = () => {
    dispatch(logout());
  }

  const switchLogin = () => {
    //TestLogin.login = !TestLogin.login;
    loginU({email:"test@mail.ru", password:"12345"});
  }

  const showTestLogin = () => {
    return <button onClick={switchLogin}>Switch Login</button>
  }

  const LoginView  = observer(() => {
    return <p>{isLogin() ? 'Login' : 'Unlogin'}</p>
  })

  const showBtnIfLogin = () => {
    if (login) {
      return <button className='header-button-logout' onClick={logoutOnClick}>ВЫЙТИ</button>
    }
  }

  return(
      <header className='header-container'>
        <h1 className='header-title'>Список дел</h1>
        {showTestLogin()}
        <LoginView/>
        {showBtnIfLogin()}
      </header>
  );
}

export default Header;

import './Header.css';
import {isLogin, logout} from '../../features/login-state/loginState';
import { observer } from "mobx-react";

const Header = () => {

  const logoutOnClick = () => {
    logout();
  }

  const LogoutBtn = observer(() => {
    if (isLogin()) {
      return <button className='header-button-logout' onClick={logoutOnClick}>ВЫЙТИ</button>
    } else {
      return null;
    }
  })

  return(
      <header className='header-container'>
        <h1 className='header-title'>Список дел</h1>
        <LogoutBtn/>
      </header>
  );
}

export default Header;

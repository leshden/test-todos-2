import './Header.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import {useAppDispatch} from '../../app/store';
import {logout} from '../../features/login-state/loginStateSlice';

const Header = () => {

  const { login } = useSelector((state: RootState) => state.login)
  const dispatch = useAppDispatch();

  const logoutOnClick = () => {
    dispatch(logout());
  }

  const showBtnIfLogin = () => {
    if (login) {
      return <button className='header-button-logout' onClick={logoutOnClick}>ВЫЙТИ</button>
    }
  }

  return(
    <header className='header-container'>
      <h1 className='header-title'>Личный кабинет</h1>
      {showBtnIfLogin()}
    </header>
  );
}

export default Header;

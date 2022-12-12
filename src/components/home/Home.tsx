import { useEffect } from 'react';
import { useSelector } from 'react-redux'
import { useAppDispatch, RootState } from '../../app/store';
import { getAsync } from '../../features/contacts/contactsStateSlice';
import { Link } from "react-router-dom";
import Contacts from '../contacts/Contacts';
import Filter from '../filter/Filter';
import AddContact from '../add-contact/AddContact';
import './Home.css';

const Home = () => {

  const { login, email } = useSelector((state: RootState) => state.login)
  const dispatch = useAppDispatch();

  useEffect(()=>{
    if (login) {
      dispatch(getAsync({email}))
    }
  }, [login, email])

  const loginOrNot = () => {
    if (login) {
      return (
        <div className='home-container'>
          <section className='home-contacts-container'>
            <Filter />
            <AddContact />
            <Contacts />
          </section>
        </div>
      );
    } else {
      return (
        <div className='home-no-login-container'>
          <h1 className='home-no-login-title'>Добро пожаловать</h1>
          <p>Для входа в <strong>Личный кабинет</strong> необходима <Link to='/login'>Авторизация</Link></p>
          <p>Если у вас еще нет аккаунта, то нужна <Link to='/register'>Регистрация</Link> </p>
        </div>
      );
    }
  }

  return loginOrNot();
}

export default Home;

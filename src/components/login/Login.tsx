import {useState} from 'react';
import { useSelector } from 'react-redux'
import Error from '../error/Error'
import {loginAsync} from '../../features/login-state/loginStateSlice';
import {useAppDispatch, RootState} from '../../app/store';
import './Login.css';

const Login = () => {

  const dispatch = useAppDispatch();
  const { error } = useSelector((state: RootState) => state.login)

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onChangeEmail = (event: React.FormEvent<HTMLInputElement>):void => {
    setEmail(event.currentTarget.value);
  }

  const onChangePassword = (event: React.FormEvent<HTMLInputElement>):void => {
    setPassword(event.currentTarget.value);
  }

  const onSubmitForm = (event: React.FormEvent<HTMLFormElement>):void => {
    event.preventDefault();
    dispatch(loginAsync({email, password}))
  }

  const showError = () => {
    if (error) {
      return <Error message={error}/>
    }
  }

  return (
    <section className='login-container'>
      <h1 className='login-title'>Авторизация</h1>
      {showError()}

      <form className='login-form' onSubmit ={onSubmitForm}>
        <div className='login-form-input'>
          <label htmlFor='email'>Email: </label>
          <input type='email' id='email' required onChange={onChangeEmail} />
        </div>
        <div className='login-form-input'>
          <label htmlFor='password'>Пароль: </label>
          <input type='password' autoComplete='off' id='password' required onChange={onChangePassword} />
        </div>
        <input className='login-btn' type="submit" value='Login'/>
      </form>
    </section>
  )
}

export default Login;

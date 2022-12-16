import {useState} from 'react';
import Error from '../error/Error'
import {register, error} from '../../features/login-state/loginState';
import { useNavigate } from "react-router-dom";
import './Register.css';

const Register = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const onChangeEmail = (event: React.FormEvent<HTMLInputElement>):void => {
    setEmail(event.currentTarget.value);
  }

  const onChangePassword = (event: React.FormEvent<HTMLInputElement>):void => {
    setPassword(event.currentTarget.value);
  }

  const onSubmitForm = (event: React.FormEvent<HTMLFormElement>):void => {
    event.preventDefault();
    register({email, password});
    navigate ('/', {replace: true} );
  }

  const showError = () => {
    if (error()) {
      return <Error message={error()}/>
    }
  }

  return (
    <section className='register-container'>
      <h1 className='register-title'>Регистрация</h1>
      {showError()}

      <form className='register-form' onSubmit ={onSubmitForm}>
        <div className='register-form-input'>
          <label htmlFor='email'>Email: </label>
          <input type='email' id='email' required onChange={onChangeEmail} />
        </div>
        <div className='register-form-input'>
          <label htmlFor='password'>Password: </label>
          <input type='password' autoComplete='off' id='password' required onChange={onChangePassword} />
        </div>
        <input className='register-btn' type="submit" value='Login'/>
      </form>
    </section>
  )
}

export default Register;

import {useState} from 'react';
import { useSelector } from 'react-redux'
import Error from '../error/Error'
import {registerAsync} from '../../features/login-state/loginStateSlice';
import {useAppDispatch, RootState} from '../../app/store';
import './Register.css';

const Register = () => {
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
    dispatch(registerAsync({email, password}))
  }

  const showError = () => {
    if (error) {
      return <Error message={error}/>
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

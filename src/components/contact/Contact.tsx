import {useState} from 'react';
import { useSelector } from 'react-redux'
import {ContactUser} from '../../interfaces/Contact';
import { useAppDispatch, RootState } from '../../app/store';
import { editAsync, deleteAsync } from '../../features/contacts/contactsStateSlice';
import './Contact.css';

type Props = {
  user: ContactUser;
}

const Contact = ({user}: Props) => {
  const {id, name, surname, phone} = user;

  const [edit, setEdit] = useState(false);

  const [nameValue, setNameValue] = useState(name);
  const [surnameValue, setSurnameValue] = useState(surname);
  const [phoneValue, setPhoneValue] = useState(phone);

  const { email } = useSelector((state: RootState) => state.login)
  const dispatch = useAppDispatch();

  const resetValues = () => {
    setNameValue(name);
    setSurnameValue(surname);
    setPhoneValue(phone);
  }

  const editOnClick = () => {
    setEdit(!edit);
    resetValues();
  }

  const editName = (event : React.ChangeEvent<HTMLInputElement>) => {
    setNameValue(event.target.value);
  }
  const editSurname = (event : React.ChangeEvent<HTMLInputElement>) => {
    setSurnameValue(event.target.value);
  }
  const editPhone = (event : React.ChangeEvent<HTMLInputElement>) => {
    setPhoneValue(event.target.value);
  }

  const acceptOnClick = () => {
    if((name === nameValue) && (surname === surnameValue) && (phone === phoneValue)) {
      editOnClick(); // отменяем, раз нет изменений
      return;
    }

    dispatch(editAsync({ email, id, name: nameValue, surname: surnameValue, phone: phoneValue}));
    setEdit(false);
  }

  const deleteOnClick = () => {
    dispatch(deleteAsync({ email, id}));
  }

  const showAcceptBtn = () => {
    if (edit) {
      return <button className='contact-accept-btn' onClick={acceptOnClick}>Принять</button>
    }
  }

  const nameClasses = `contact-input ${edit ? 'contact-input-write' : 'contact-input-read'}`;
  const editBtnStr = edit ? 'Отменить' : 'Редактировать';

  return (
    <li className='contact-container'>
      <input className={nameClasses} type='text' value={nameValue}  disabled={!edit} onChange={editName} />
      <input className={nameClasses} type='text' value={surnameValue} disabled={!edit} onChange={editSurname} />
      <input className={nameClasses} type='text' value={phoneValue} disabled={!edit} onChange={editPhone} />
      <div className='contact-container-btn'>
        <button className='contact-edit-btn' onClick={editOnClick}>{editBtnStr}</button>
        { showAcceptBtn() }
      </div>
      <button onClick={deleteOnClick}>Удалить</button>
    </li>
  )
}

export default Contact;

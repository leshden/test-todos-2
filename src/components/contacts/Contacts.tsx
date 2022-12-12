import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import Contact from '../contact/Contact';
import { TYPE_NAME, TYPE_SURNAME, TYPE_PHONE} from '../../features/filter/filterStateSlice';
import './Contacts.css';

const Contacts = () => {
  const { contacts } = useSelector((state: RootState) => state.contacts)
  const { filter, type } = useSelector((state: RootState) => state.filter)

  const filterContacts = filter==='' ? contacts : contacts.filter(item => {
    let value = item.name;
    switch (type) {
      case TYPE_SURNAME: value = item.surname; break;
      case TYPE_PHONE: value = item.phone; break;
    }
    return value.toLowerCase().includes(filter.toLowerCase())
  });

  console.log(`contacts: ${contacts}`);

  return (
    <section className='contacts-container'>
      <h3 className='contacts-title'>Контакты</h3>
      <div className='contacts-header'>
          <p className='contacts-name-title'>Имя</p>
          <p className='contacts-name-title'>Фамилия</p>
          <p className='contacts-name-title'>Телефон</p>
      </div>
      <ul className='contacts-ul-container'>
        {filterContacts.map((item, index) => <Contact key={item.id} user={item} />)}
      </ul>
    </section>
  )
}

export default Contacts;

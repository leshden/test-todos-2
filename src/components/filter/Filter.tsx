import {useState} from 'react';
import {setFilter, setType, TYPE_NAME, TYPE_SURNAME, TYPE_PHONE} from '../../features/filter/filterStateSlice';
import { useAppDispatch, RootState } from '../../app/store';
import './Filter.css';

const Filter = () => {

  const [filterValue, setFilterValue] = useState('');
  const dispatch = useAppDispatch();

  const changeFilterValue = (event : React.ChangeEvent<HTMLInputElement>) => {
    setFilterValue(event.target.value);
    dispatch(setFilter(event.target.value));
  }

  const changeTypeFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(event.target.value);
    dispatch(setType(event.target.value));
  }

  return (
    <section className='filter-container'>
      <h1 className='filter-title'>Поисковый фильтр</h1>
      <div className='filter-input-container'>
        <input className='filter-input' type='text' value={filterValue} onChange={changeFilterValue} />
        <select name="filter-select" onChange={changeTypeFilter} defaultValue={TYPE_NAME}>
          <option value={TYPE_NAME}>Имя</option>
          <option value={TYPE_SURNAME}>Фамилия</option>
          <option value={TYPE_PHONE}>Телефон</option>
        </select>
      </div>
    </section>
  )
}

export default Filter;

import './FilterPanel.css';
import Fragment, {useState} from 'react';
//import {TodoContext} from '../../contexts/TodoContext';

const FilterPanel = () => {
  const [filter, setFilter] = useState(['filter-button-todos filter-border-todo', 'filter-button-todos', 'filter-button-todos']);
  //const {filterTab, setFilterTab} = useContext(TodoContext);

  const handleAllFilter = () => {
    changeFilter(0);
  }

  const handleActiveFilter = () => {
    changeFilter(1);
  }

  const handleCompletedFilter = () => {
    changeFilter(2);
  }

  function changeFilter(id: number) {

    // if (filterTab === id) {
    //   return;
    // }

    setFilter(filter.map((item, index) => index === id ? 'filter-button-todos filter-border-todo' : 'filter-button-todos'));
    //setFilterTab(id);
  }

  return(
    <>
      <button className= {filter[0]} onClick={handleAllFilter}>All</button>
      <button className= {filter[1]} onClick={handleActiveFilter}>Active</button>
      <button className= {filter[2]} onClick={handleCompletedFilter}>Completed</button>
    </>
  );
}

export default FilterPanel;

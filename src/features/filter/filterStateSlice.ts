import {createSlice} from '@reduxjs/toolkit';

export const TYPE_NAME = 'filter_by_name';
export const TYPE_SURNAME = 'filter_by_surname';
export const TYPE_PHONE = 'filter_by_phone';

interface FilterState {
  filter: string;
  type: string;
}

const initialState = {
  filter: '',
  type: TYPE_NAME,
} as FilterState

export const filterStateSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setType: (state, action) => {
      state.type = action.payload;
    },
  },
});

export const {setFilter, setType} = filterStateSlice.actions;

export default filterStateSlice.reducer;

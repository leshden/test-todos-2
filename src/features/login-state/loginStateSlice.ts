import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios, {AxiosError} from "axios";

interface LoginState {
  login: boolean;
  access_token: string;
  email: string;
  error: string | null | undefined;
}

interface ResponseData {
  access_token: string;
  email: string;
}

interface ValidationErrors {
  message: string
}

interface User {
  email: string;
  password: string;
}

const initialState = {
  login: false,
  access_token: '',
  email: '',
  error: '',
} as LoginState

export const loginAsync = createAsyncThunk<ResponseData, User, { rejectValue: ValidationErrors }>(
  'login-state/loginAsync',
  async (userData, { rejectWithValue }) => {
    try {
      const { email, password } = userData
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email, password
      });
      return response.data;
    } catch (err) {
      let error: AxiosError<ValidationErrors> = err as AxiosError<ValidationErrors>
      if (!error.response) {
        throw err
      }
      return rejectWithValue(error.response.data)
    }
});

export const registerAsync = createAsyncThunk<ResponseData, User, { rejectValue: ValidationErrors }>(
  'login-state/registerAsync',
  async (userData, { rejectWithValue }) => {
    try {
      const { email, password } = userData
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        email, password
      });
      return response.data;
    } catch (err) {
      let error: AxiosError<ValidationErrors> = err as AxiosError<ValidationErrors>
      if (!error.response) {
        throw err
      }
      return rejectWithValue(error.response.data)
    }
});

export const loginStateSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    logout: (state) => {
      state.access_token = "";
      state.login = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.access_token = action.payload.access_token;
        state.email = action.payload.email;
        state.login = true;
        state.error = null;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload.message;
        } else {
          state.error = action.error.message;
        }
      })
      .addCase(registerAsync.pending, (state) => {
      })
      .addCase(registerAsync.fulfilled, (state, action) => {
        state.access_token = action.payload.access_token;
        state.email = action.payload.email;
        state.login = true;
        state.error = null;
        console.log(action)
      })
      .addCase(registerAsync.rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload.message;
        } else {
          state.error = action.error.message;
        }
      });
  },
});

export const { logout } = loginStateSlice.actions;

export default loginStateSlice.reducer;

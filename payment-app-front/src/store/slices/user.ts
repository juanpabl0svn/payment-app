// src/store/userSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import { UserState } from '../../utils/interfaces';


const initialState: UserState = {
  isLoggedIn: false,
  email: '',
  name: ''
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.email = action.payload.email;
      state.name = action.payload.name
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.email = null;
      state.name = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;

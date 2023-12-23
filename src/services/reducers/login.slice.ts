import { createSlice } from '@reduxjs/toolkit';

const initialState = '';

const loginSlice = createSlice({
  name: 'loginSlice',
  initialState,
  reducers: {
    signIn: (state, action) => {
      state = action.payload;
    },
    signOut: (state) => {
      state = '';
    },
  },
});

export const { signIn, signOut } = loginSlice.actions;
export default loginSlice.reducer;

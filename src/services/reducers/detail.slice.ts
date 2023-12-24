import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState = { value: 0 };

export const detailsSlice = createSlice({
  name: 'detail',
  initialState,
  reducers: {
    detail: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
  },
});

export const { detail } = detailsSlice.actions;
export default detailsSlice.reducer;

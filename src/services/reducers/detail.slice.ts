import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Student } from '../../models/Student';
import { studentInitial } from '../../models/initials';

// Define the initial state using that type
const initialState: Student = studentInitial;

export const detailsSlice = createSlice({
  name: 'detail',
  initialState,
  reducers: {
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload;
    // },
  },
});

// export const { incrementByAmount } = counterSlice.actions;

export const selectName = (state: RootState) => state;

export default detailsSlice.reducer;

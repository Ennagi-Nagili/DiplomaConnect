import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { studentInitial } from '../../models/initials';

// Define a type for the slice state
interface IDetailState {
  id: number;
  name: string;
  faculty: string;
  major: string;
  degree: string;
  phone: string;
  mail: string;
  birth: string;
  education: string;
  success: string;
  review: string;
}

// Define the initial state using that type
const initialState: IDetailState = studentInitial;

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

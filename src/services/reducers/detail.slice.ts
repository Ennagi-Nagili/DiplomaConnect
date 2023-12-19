import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

// Define a type for the slice state
interface IDetailState {
  name: string;
}

// Define the initial state using that type
const initialState: IDetailState = {
  name: '',
};

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

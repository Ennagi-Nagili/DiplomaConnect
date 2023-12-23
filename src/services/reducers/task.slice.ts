import { RootState } from '../store';
import { createSlice } from '@reduxjs/toolkit';

const initialState = { studentId: 0, taskId: 0 };

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    task: (state, action) => {
      state = action.payload;
    },
  },
});

// export const { incrementByAmount } = counterSlice.actions;

export const selectCount = (state: RootState) => state.task;

export default taskSlice.reducer;

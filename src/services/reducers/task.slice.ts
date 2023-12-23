import { RootState } from '../store';
import { Task } from '../../models/Task';
import { createSlice } from '@reduxjs/toolkit';
import { taskInitial } from '../../models/initials';

interface ITaskState extends Task {}

const initialState: ITaskState = taskInitial;

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

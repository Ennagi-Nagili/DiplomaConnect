import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState = { studentId: 0, taskId: 0 };

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    task: (state, action: PayloadAction<{ studentId: number; taskId: number }>) => {
      state.studentId = action.payload.studentId;
      state.taskId = action.payload.taskId;
      console.log(action.payload);
    },
  },
});

export const { task } = taskSlice.actions;
export default taskSlice.reducer;

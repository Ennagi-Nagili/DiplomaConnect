import { Task } from '../../../models/Task';
import { createAction, createReducer } from '@reduxjs/toolkit';

interface TaskState {
  value: Task;
}

const details = createAction<Task>('task/details');

const initialState = { value: initial } as TaskState;

export const taskReducer = createReducer(initialState, (builder) => {
  builder.addCase(details, (state, action) => {
    state.value = action.payload;
  });
});

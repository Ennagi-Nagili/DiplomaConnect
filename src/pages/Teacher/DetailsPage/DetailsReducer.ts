import { Student } from '../../../models/Student';
import { createAction, createReducer } from '@reduxjs/toolkit';

interface DetailsState {
  value: Student;
}

const details = createAction<Student>('student/details');

const initialState = { value: initial } as DetailsState;

export const detailsReducer = createReducer(initialState, (builder) => {
  builder.addCase(details, (state, action) => {
    state.value = action.payload;
  });
});

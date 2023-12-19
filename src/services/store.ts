import { configureStore } from '@reduxjs/toolkit';

import taskReducer from './reducers/task.slice';
import detailsSlice from './reducers/detail.slice';

export const store = configureStore({
  reducer: {
    task: taskReducer,
    detail: detailsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

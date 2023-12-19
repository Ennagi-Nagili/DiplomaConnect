import { configureStore } from '@reduxjs/toolkit';

import { usersReducer } from './reducers/users.slice';
import detailsSlice from './reducers/detail.slice';
import taskReducer from './reducers/task.slice';

export const store = configureStore({
  reducer: {
    task: taskReducer,
    detail: detailsSlice,
    users: usersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

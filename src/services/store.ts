import { configureStore } from '@reduxjs/toolkit';

import taskReducer from './reducers/task.slice';
import detailsSlice from './reducers/detail.slice';
import { usersReducer } from './reducers/users.slice';

export const store = configureStore({
  reducer: {
    task: taskReducer,
    detail: detailsSlice,
    users: usersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

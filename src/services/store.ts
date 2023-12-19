import { configureStore } from '@reduxjs/toolkit';
<<<<<<< HEAD

import taskReducer from './reducers/task.slice';
import detailsSlice from './reducers/detail.slice';

export const store = configureStore({
  reducer: {
    task: taskReducer,
    detail: detailsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
=======
import { usersReducer } from './reducers/users.slice';
// ...

export const store = configureStore({
  reducer: {
    users: usersReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
>>>>>>> 4661718d05e2ea3e0a41dff28e68a6bf046e163f
export type AppDispatch = typeof store.dispatch;

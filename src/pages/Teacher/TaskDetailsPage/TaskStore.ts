import { configureStore } from '@reduxjs/toolkit';
import { taskReducer } from './TaskReducer';

export const store = configureStore({ reducer: taskReducer });

import { configureStore } from '@reduxjs/toolkit';
import { detailsReducer } from '../pages/Teacher/DetailsPage/DetailsReducer';
import { taskReducer } from '../pages/Teacher/TaskDetailsPage/TaskReducer';

export const detailsStore = configureStore({ reducer: detailsReducer });

export const taskStore = configureStore({ reducer: taskReducer });

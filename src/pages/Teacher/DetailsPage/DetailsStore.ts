import { configureStore } from '@reduxjs/toolkit';
import { detailsReducer } from './DetailsReducer';

export const store = configureStore({ reducer: detailsReducer });

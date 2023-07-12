import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import categoriesReducer from './category/categorySlice';
import modalReducer from './modal/modalSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    categories: categoriesReducer,
    modal: modalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

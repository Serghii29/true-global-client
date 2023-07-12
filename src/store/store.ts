import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import categoriesReducer from './category/categorySlice';
import modalReducer from './modal/modalSlice';
import taskReducer from './task/taskSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    categories: categoriesReducer,
    modal: modalReducer,
    tasks: taskReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

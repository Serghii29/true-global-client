import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MethodType } from '../../types';

export interface ModalState {
  method: MethodType;
  isVisibleModal: boolean;
  isVisibleModalDelete: boolean;
  isVisibleModalAddTask: boolean;
  categoryId: number;
  taskId: number;
}

const initialState: ModalState = {
  method: MethodType.post,
  isVisibleModal: false,
  isVisibleModalDelete: false,
  isVisibleModalAddTask: false,
  categoryId: 0,
  taskId: 0,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    postMethod: (state) => {
      state.method = MethodType.post;
    },
    putchMethod: (state) => {
      state.method = MethodType.putch;
    },
    visibleModal: (state, action: PayloadAction<boolean>) => {
      state.isVisibleModal = action.payload;
    },
    visibleModalDelete: (state, action: PayloadAction<boolean>) => {
      state.isVisibleModalDelete = action.payload;
    },
    visibleModalAddTask: (state, action: PayloadAction<boolean>) => {
      state.isVisibleModalAddTask = action.payload;
    },
    addCategoryId: (state, action: PayloadAction<number>) => {
      state.categoryId = action.payload;
    },
    addTaskId: (state, action: PayloadAction<number>) => {
      state.taskId = action.payload;
    },
  },
});

export const {
  postMethod,
  putchMethod,
  visibleModal,
  addCategoryId,
  visibleModalDelete,
  visibleModalAddTask,
  addTaskId,
} = modalSlice.actions;

export default modalSlice.reducer;

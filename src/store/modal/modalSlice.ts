import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MethodType } from '../../types';

export interface ModalState {
  method: MethodType;
  isVisibleModal: boolean;
  isVisibleModalDelete: boolean;
  isVisibleModalAddTask: boolean;
  taskId: number;
}

const initialState: ModalState = {
  method: MethodType.post,
  isVisibleModal: false,
  isVisibleModalDelete: false,
  isVisibleModalAddTask: false,
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
      if (state.isVisibleModalDelete === false) {
        state.isVisibleModal = action.payload;
      }
    },
    visibleModalDelete: (state, action: PayloadAction<boolean>) => {
      if (state.isVisibleModal === false) {
        state.isVisibleModalDelete = action.payload;
      }
    },
    visibleModalAddTask: (state, action: PayloadAction<boolean>) => {
      state.isVisibleModalAddTask = action.payload;
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
  visibleModalDelete,
  visibleModalAddTask,
  addTaskId,
} = modalSlice.actions;

export default modalSlice.reducer;

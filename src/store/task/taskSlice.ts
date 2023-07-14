import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { client } from '../../api/axios.api';
import { Task, TaskDataCreate, TaskDataUpdate } from '../../types';

export interface TaskState {
  tasks: Task[];
  loading: boolean;
}

const initialState: TaskState = {
  tasks: [],
  loading: false,
};

export const taskAsync = createAsyncThunk(
  'tasks/getAllTasks',
  async (categoryId: number) => {
    try {
      const data = client.get<Task[]>(`/tasks/${categoryId}`);

      return data;
    } catch (error: any) {
      const messageForError = error.response.data.message;

      toast.error(messageForError.toString());
    }
  }
);

export const addNewTaskAsync = createAsyncThunk(
  'tasks/addTask',
  async (data: TaskDataCreate) => {
    try {
      const newTask = client.post<Task>(`/tasks`, data);

      return newTask;
    } catch (error: any) {
      const messageForError = error.response.data.message;

      toast.error(messageForError.toString());
    }
  }
);

interface fetchParam {
  taskId: number;
  newTask: TaskDataUpdate;
}

export const updateTaskAsync = createAsyncThunk(
  'tasks/updateTask',
  async ({ taskId, newTask }: fetchParam) => {
    try {
      const updateTask = client.patch<Task>(`/tasks/${taskId}`, newTask);

      return updateTask;
    } catch (error: any) {
      const messageForError = error.response.data.message;

      toast.error(messageForError.toString());
    }
  }
);

export const deleteTaskAsync = createAsyncThunk(
  'tasks/deleteTask',
  async (id: number) => {
    try {
      client.delete<Task>(`/tasks/${id}`);

      return id;
    } catch (error: any) {
      const messageForError = error.response.data.message;

      toast.error(messageForError.toString());
    }
  }
);

export const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(taskAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(taskAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload as Task[];
      })
      .addCase(taskAsync.rejected, (state) => {
        state.loading = false;
      })
      .addCase(addNewTaskAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(addNewTaskAsync.fulfilled, (state, action) => {
        state.loading = false;

        state.tasks.push(action.payload as Task);
      })
      .addCase(addNewTaskAsync.rejected, (state) => {
        state.loading = false;
      })
      .addCase(updateTaskAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateTaskAsync.fulfilled, (state, action) => {
        state.loading = false;

        const findCategoryIndex = state.tasks.findIndex(
          (task) => task.id === action.payload?.id
        );

        if (findCategoryIndex >= 0 && action.payload) {
          state.tasks[findCategoryIndex] = action.payload;
        }
      })
      .addCase(updateTaskAsync.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deleteTaskAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTaskAsync.fulfilled, (state, action) => {
        state.loading = false;

        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      })
      .addCase(deleteTaskAsync.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default taskSlice.reducer;

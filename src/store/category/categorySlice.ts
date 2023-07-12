import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { client } from '../../api/axios.api';
import { Category } from '../../types';

interface fetchParam {
  categoryId: number;
  title: string;
}

export interface CategoryState {
  categories: Category[];
  loading: boolean;
}

const initialState: CategoryState = {
  categories: [],
  loading: false,
};

export const categoriesAsync = createAsyncThunk(
  'categories/fetchCategories',
  async() => {
    try {
      const data = client.get<Category[]>('/categories');

      return data;
    } catch (error: any) {
      const messageForError = error.response.data.message;

      toast.error(messageForError.toString());
    }
  },
);

export const addCategoryAsync = createAsyncThunk(
  'categories/addCategory',
  async(title: string) => {
    try {
      const data = client.post<Category>('/categories', { title });

      return data;
    } catch (error: any) {
      const messageForError = error.response.data.message;

      toast.error(messageForError.toString());
    }
  },
);

export const updateCategoryAsync = createAsyncThunk(
  'categories/updateCategory',
  async({ categoryId, title }: fetchParam) => {
    try {
      client.patch<Category>(`/categories/${categoryId}`, { title });

      return { categoryId, title };
    } catch (error: any) {
      const messageForError = error.response.data.message;

      toast.error(messageForError.toString());
    }
  },
);

export const deleteCategoryAsync = createAsyncThunk(
  'categories/deleteCategory',
  async(categoryId: number) => {
    try {
      const data = client.delete<Category>(`/categories/${categoryId}`);

      return data;
    } catch (error: any) {
      const messageForError = error.response.data.message;

      toast.error(messageForError.toString());
    }
  },
);

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(categoriesAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(categoriesAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload as Category[];
      })
      .addCase(categoriesAsync.rejected, (state) => {
        state.loading = false;
      })
      .addCase(addCategoryAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(addCategoryAsync.fulfilled, (state, action) => {
        state.loading = false;

        if (action.payload) {
          state.categories.push(action.payload);
        }
      })
      .addCase(addCategoryAsync.rejected, (state) => {
        state.loading = false;
      })
      .addCase(updateCategoryAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCategoryAsync.fulfilled, (state, action) => {
        state.loading = false;

        if (action.payload) {
          const { categoryId, title } = action.payload;

          const category = state.categories.find(
            (item) => item.id === categoryId,
          );

          if (category) {
            category.name = title;
          }
        }
      })
      .addCase(updateCategoryAsync.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deleteCategoryAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCategoryAsync.fulfilled, (state, action) => {
        state.loading = false;

        state.categories = state.categories.filter(
          (category) => category.id !== action.payload?.id,
        );
      })
      .addCase(deleteCategoryAsync.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default categoriesSlice.reducer;

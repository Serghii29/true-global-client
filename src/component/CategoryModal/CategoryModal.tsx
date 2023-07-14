import { FC, useEffect, useState } from 'react';
import { Form } from 'react-router-dom';
import { toast } from 'react-toastify';
import { client } from '../../api/axios.api';
import { getTokenFromLocalStorage } from '../../helpers/localStorage.helper';
import {
  addCategoryAsync,
  updateCategoryAsync,
} from '../../store/category/categorySlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { postMethod, visibleModal } from '../../store/modal/modalSlice';
import { Category, MethodType } from '../../types';
import './CategoryModal.css';

export const CategoryModal: FC = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<Category | null>(null);
  const { method, isVisibleModal } = useAppSelector((state) => state.modal);

  const isMethod = method === MethodType.post;
  const categoryId = +getTokenFromLocalStorage('categoryId');

  const dispath = useAppDispatch();

  const handleCloseModal = () => {
    dispath(visibleModal(!isVisibleModal));
    dispath(postMethod());
  };

  const getOneCategory = async() => {
    try {
      const data = await client.get<Category>(`/categories/${categoryId}`);

      setCategory(data);
    } catch (error: any) {
      const messageForError = error.response.data.message;

      toast.error(messageForError.toString());
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (isMethod) {
      dispath(addCategoryAsync(title));
    } else {
      dispath(updateCategoryAsync({ categoryId, title }));
    }

    handleCloseModal();
  };

  useEffect(() => {
    if (!isMethod) {
      getOneCategory();
    }
  }, [categoryId]);

  return (
    <div className="category-modal">
      <Form onSubmit={handleSubmit} className="category-modal--form">
        <label htmlFor="name" className="category-modal--label">
          <small className="category-modal--header">
            {isMethod ? 'Add new category' : `Edit ${category?.name} category`}
          </small>
          <span className="category-modal--input-header">name</span>
          <input
            type="text"
            name="name"
            className="category-modal--input"
            placeholder={isMethod ? 'Title..' : category?.name}
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </label>

        <div className="category-modal--button-container">
          <button
            className="category-modal--button button--red"
            onClick={handleCloseModal}
          >
            cancel
          </button>
          <button className="category-modal--button button--green">save</button>
        </div>
      </Form>
    </div>
  );
};

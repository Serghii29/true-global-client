import React, { FC, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { client } from '../../api/axios.api';
import { setTokenToLocalStorage } from '../../helpers/localStorage.helper';
import { useAppDispatch } from '../../store/hooks';
import {
  putchMethod,
  visibleModal,
  visibleModalDelete,
} from '../../store/modal/modalSlice';
import { Category } from '../../types';
import './CategoryItem.css';

type Props = {
  category: Category;
};

export const CategoryItem: FC<Props> = ({ category }) => {
  // eslint-disable-next-line no-shadow
  const { id, name, dateCreated } = category;
  const [tasksCount, setTasksCount] = useState(0);
  const [isActionsOpen, setIsActionsOpen] = useState(false);

  const dispath = useAppDispatch();
  const navigate = useNavigate();

  const preparedDate = dateCreated.slice(0, 10);

  const handleActionsToggle = () => {
    setIsActionsOpen(!isActionsOpen);
    setTokenToLocalStorage('categoryId', id.toString());
  };

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsActionsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const handleMoreClick = () => {
    setTokenToLocalStorage('categoryId', id.toString());
    setTokenToLocalStorage('categoryName', name);
    navigate('/tasks');
  };

  const handleEdit = () => {
    dispath(putchMethod());
    dispath(visibleModal(true));
    setIsActionsOpen(false);
  };

  const handleDelete = () => {
    dispath(visibleModalDelete(true));
    setIsActionsOpen(false);
  };

  const handleTaskCount = async() => {
    const data = await client.get<number>(`count/${id}`);

    setTasksCount(data);
  };

  useEffect(() => {
    handleTaskCount();
  }, []);

  return (
    <div className="category-item">
      <div className="category-item-details">
        <p className="category-item-title">{name}</p>
        <p className="category-item-amount">{`${tasksCount} tasks`}</p>

        <p className="category-item-date">{preparedDate}</p>
      </div>

      <div className="category-item--button-container">
        <button
          onClick={handleActionsToggle}
          className="category-item--button button-actions"
        >
          actions
        </button>
        {isActionsOpen && (
          <div className="actions-menu" ref={menuRef}>
            <ul className="actions-menu--list">
              <li className="actions-menu--item" onClick={handleEdit}>
                Edit
              </li>
              <li className="actions-menu--item" onClick={handleDelete}>
                Delete
              </li>
            </ul>
          </div>
        )}

        <button
          onClick={handleMoreClick}
          className="category-item--button button-more"
        >
          more
        </button>
      </div>
    </div>
  );
};

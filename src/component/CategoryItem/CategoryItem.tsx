import React, { FC, useEffect, useRef, useState } from 'react';
import { useAppDispatch } from '../../store/hooks';
import {
  addCategoryId,
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
  const [isActionsOpen, setIsActionsOpen] = useState(false);

  const dispath = useAppDispatch();

  const preparedDate = dateCreated.slice(0, 10);

  const handleActionsToggle = () => {
    setIsActionsOpen(!isActionsOpen);
    dispath(addCategoryId(id));
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

  const handleMoreClick = () => {};

  const handleEdit = () => {
    dispath(putchMethod());
    dispath(visibleModal(true));
    setIsActionsOpen(false);
  };

  const handleDelete = () => {
    dispath(visibleModalDelete(true));
    setIsActionsOpen(false);
  };

  return (
    <div className="category-item">
      <div className="category-item-details">
        <p>{name}</p>
        <p>11 tasks</p>

        <p>{preparedDate}</p>
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

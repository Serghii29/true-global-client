import { FC } from 'react';
import { deleteCategoryAsync } from '../../store/category/categorySlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { visibleModalDelete } from '../../store/modal/modalSlice';
import './DeletePopup.css';

type Props = {
  type: 'category' | 'task';
};

export const DeletePopup: FC<Props> = ({ type }) => {
  const { categoryId } = useAppSelector((state) => state.modal);
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    dispatch(deleteCategoryAsync(categoryId));
    dispatch(visibleModalDelete(false));
  };

  const handleCancel = () => {
    dispatch(visibleModalDelete(false));
  };

  return (
    <div className="delete-popup">
      <span>{`Do you want delete this ${type}?`}</span>

      <div className="delete-popup--button-container">
        <button
          className="delete-popup--button button--no"
          onClick={handleCancel}
        >
          no
        </button>
        <button
          className="delete-popup--button button--yes"
          onClick={handleDelete}
        >
          yes
        </button>
      </div>
    </div>
  );
};

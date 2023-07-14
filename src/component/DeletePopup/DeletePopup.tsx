import { FC } from 'react';
import { getTokenFromLocalStorage } from '../../helpers/localStorage.helper';
import { deleteCategoryAsync } from '../../store/category/categorySlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { visibleModalDelete } from '../../store/modal/modalSlice';
import { deleteTaskAsync } from '../../store/task/taskSlice';
import './DeletePopup.css';

type Props = {
  type: 'category' | 'task';
};

export const DeletePopup: FC<Props> = ({ type }) => {
  const { taskId } = useAppSelector((state) => state.modal);
  const dispatch = useAppDispatch();

  const categoryId = +getTokenFromLocalStorage('categoryId');

  const handleDelete = () => {
    if (type === 'category') {
      dispatch(deleteCategoryAsync(categoryId));
    } else {
      dispatch(deleteTaskAsync(taskId));
    }

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

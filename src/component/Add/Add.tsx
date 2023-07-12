import { FC } from 'react';
import { useAppDispatch } from '../../store/hooks';
import {
  visibleModal,
  visibleModalAddTask,
} from '../../store/modal/modalSlice';
import './Add.css';

type Props = {
  type: 'category' | 'task';
};

export const Add: FC<Props> = ({ type }) => {
  const dispath = useAppDispatch();

  const isCategory = type === 'category';

  const handleAdd = () => {
    if (isCategory) {
      dispath(visibleModal(true));
    } else {
      dispath(visibleModalAddTask(true));
    }
  };

  return (
    <button className="button-add" onClick={handleAdd}>
      {isCategory ? 'Add category' : 'Add task'}
    </button>
  );
};

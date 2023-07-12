import { FC } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { visibleModal } from '../../store/modal/modalSlice';
import './Add.css';

type Props = {
  type: 'category' | 'task';
};

export const Add: FC<Props> = ({ type }) => {
  const dispath = useAppDispatch();

  return (
    <button className="button-add" onClick={() => dispath(visibleModal(true))}>
      {type === 'category' ? 'Add category' : 'Add task'}
    </button>
  );
};

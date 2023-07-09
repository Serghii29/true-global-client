import { FC } from 'react';
import './Add.css';

type Props = {
  type: 'category' | 'task';
};

export const Add: FC<Props> = ({ type }) => {
  return (
    <button className="button-add">
      {type === 'category' ? 'Add category' : 'Add task'}
    </button>
  );
};

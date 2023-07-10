import { FC } from 'react';
import { Add } from '../Add';
import { TaskItem } from '../TaskItem';
import './TaskList.css';

export const TaskList: FC = () => {
  const type = 'task';

  return (
    <div className="task-list">
      <div className='task-list--header'>
        <span>Category</span>

        <Add type={type} />
      </div>

      <div className='task-item-container'>
        <TaskItem />
        <TaskItem />
        <TaskItem />
        <TaskItem />
      </div>
    </div>
  );
};

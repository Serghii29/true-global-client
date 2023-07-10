import { FC } from 'react';
import './TaskItem.css';

export const TaskItem: FC = () => {
  return (
    <div className='task-container'>
      <h3>Fix phone input field</h3>

      <div className='task-data'>
        <span>Start date</span>
        <span>16.07.2023</span>
      </div>

      <div className='task-data'>
        <span>End date</span>
        <span>22.07.2023</span>
      </div>

      <div className="task-button-container">
        <button className="task-action button--red">delete</button>
        <button className="task-action action--edit button--green">edit</button>
      </div>
    </div>
  );
};

import { FC } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { addTaskId, visibleModalDelete } from '../../store/modal/modalSlice';
import { Task } from '../../types';
import './TaskItem.css';

type Props = {
  task: Task;
};

export const TaskItem: FC<Props> = ({ task }) => {
  // eslint-disable-next-line no-shadow
  const { id, name, dateStart, dateEnd } = task;

  const dispatch = useAppDispatch();

  const handleDelete = () => {
    dispatch(addTaskId(id));
    dispatch(visibleModalDelete(true));
  };

  return (
    <div className="task-container">
      <h3>{name}</h3>

      <div className="task-data">
        <span>Start date</span>
        <span>{dateStart}</span>
      </div>

      <div className="task-data">
        <span>End date</span>
        <span>{dateEnd}</span>
      </div>

      <div className="task-button-container">
        <button className="task-action button--red" onClick={handleDelete}>
          Delete
        </button>
        <button className="task-action action--edit button--green">Edit</button>
      </div>
    </div>
  );
};

import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { taskAsync } from '../../store/task/taskSlice';
import { Add } from '../Add';
import { DeletePopup } from '../DeletePopup';
import { TaskItem } from '../TaskItem';
import './TaskList.css';

export const TaskList: FC = () => {
  const { tasks } = useAppSelector((state) => state.tasks);
  const { categoryId, isVisibleModalDelete } = useAppSelector(
    (state) => state.modal,
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(taskAsync(categoryId));
  }, []);

  return (
    <div className="task-list">
      <div className="task-list--header">
        <span>Category</span>

        <Add type="task" />
      </div>

      <div className="task-item-container">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </div>

      {isVisibleModalDelete && <DeletePopup type="task" />}
    </div>
  );
};

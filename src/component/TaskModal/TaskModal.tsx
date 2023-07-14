import { FC, useEffect, useState } from 'react';
import { Form } from 'react-router-dom';
import { toast } from 'react-toastify';
import { client } from '../../api/axios.api';
import { getTokenFromLocalStorage } from '../../helpers/localStorage.helper';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { visibleModalAddTask } from '../../store/modal/modalSlice';
import { addNewTaskAsync, updateTaskAsync } from '../../store/task/taskSlice';
import { Category, MethodType, Task } from '../../types';
import './TaskModal.css';

export const TaskModal: FC = () => {
  // eslint-disable-next-line no-shadow
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [dateStart, setDateStart] = useState('');
  const [dateEnd, setDateEnd] = useState('');
  const [category, setCategory] = useState<Category | null>(null);
  const [task, setTask] = useState<Task | null>(null);

  const { method, taskId } = useAppSelector((state) => state.modal);

  const getOneTask = async() => {
    try {
      const data = await client.get<Task>(`/tasks/task/${taskId}`);

      setTask(data);
      setName(data.name);
      setDescription(data.description);
      setDateEnd(data.dateEnd);
      setDateStart(data.dateStart);
    } catch (error: any) {
      const messageForError = error.response.data.message;

      toast.error(messageForError.toString());
    }
  };

  const categoryId = getTokenFromLocalStorage('categoryId');

  const getOneCategory = async() => {
    try {
      const data = await client.get<Category>(`/categories/${categoryId}`);

      setCategory(data);
    } catch (error: any) {
      const messageForError = error.response.data.message;

      toast.error(messageForError.toString());
    }
  };

  const dispatch = useAppDispatch();

  const isMethod = method === MethodType.post;

  const handleClose = () => {
    dispatch(visibleModalAddTask(false));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const newTask = {
      name,
      description,
      dateStart,
      dateEnd,
      category,
    };

    if (isMethod) {
      dispatch(addNewTaskAsync(newTask));
    } else {
      dispatch(updateTaskAsync({ taskId, newTask }));
    }

    handleClose();
  };

  useEffect(() => {
    getOneCategory();

    if (!isMethod) {
      getOneTask();
    }
  }, []);

  return (
    <div className="task-modal">
      <Form className="task-modal--form" onSubmit={handleSubmit}>
        <label htmlFor="name" className="task-modal--label">
          <span>Name</span>
          <input
            type="text"
            name="name"
            className="task-modal--input"
            placeholder={isMethod ? 'Title..' : task?.name}
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </label>

        <label htmlFor="description" className="task-modal--label">
          <span>Description</span>
          <textarea
            name="description"
            rows={8}
            className="task-modal--input"
            placeholder={isMethod ? 'Description...' : task?.description}
            value={description}
            onChange={({ target }) => setDescription(target.value)}
          />
        </label>

        <div className="task-modal--date-container">
          <label htmlFor="start" className="task-modal--date-label">
            <span>Start date</span>
            <input
              type="date"
              name="start"
              className="task-modal--date-input"
              value={dateStart}
              onChange={({ target }) => setDateStart(target.value)}
            />
          </label>
          <label htmlFor="end" className="task-modal--date-label">
            <span>End date</span>
            <input
              type="date"
              name="end"
              className="task-modal--date-input"
              value={dateEnd}
              onChange={({ target }) => setDateEnd(target.value)}
            />
          </label>
        </div>

        <div className="category-modal--button-container">
          <button
            className="category-modal--button button--red"
            onClick={handleClose}
          >
            cancel
          </button>
          <button className="category-modal--button button--green">save</button>
        </div>
      </Form>
    </div>
  );
};

import { FC } from 'react';
import { Form } from 'react-router-dom';
import { Category } from '../../types';
import './CategoryModal.css';

type Props = {
  type: 'post' | 'patch';
   category: Category | undefined;
   setVisibleModal: (isVisible: boolean) => void;
}

export const CategoryModal: FC<Props> = ({
  type,
  category,
  setVisibleModal,
}) => {
  return (
    <div className='category-modal'>
      <Form className='category-modal--form'>
        <label
          htmlFor="name"
          className='category-modal--label'
        >
          <small className='category-modal--header'>
            {type === 'post'
              ? (
                'Add new category'
              )
              : (
                `Edit ${category?.name} category`
              )}
          </small>
          <span className='category-modal--input-header'>name</span>
          <input
            type="text"
            name='name'
            className='category-modal--input'
            placeholder={type === 'post' ? 'Title..' : category?.name}
          />
        </label>

        <div className="category-modal--button-container">
          <button className="category-modal--button button--red">cancel</button>
          <button className="category-modal--button button--green">save</button>
        </div>
      </Form>
    </div>
  );
};

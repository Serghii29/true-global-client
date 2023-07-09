import { FC, useState } from 'react';
import { Category } from '../../types';
import './CategoryItem.css';

type Props = {
  category: Category;
};

export const CategoryItem: FC<Props> = ({ category }) => {
  // eslint-disable-next-line no-shadow
  const { name, dateCreated } = category;
  const [isActionsOpen, setIsActionsOpen] = useState(false);

  const handleActionsToggle = () => {
    setIsActionsOpen(!isActionsOpen);
  };

  const handleMoreClick = () => {};

  return (
    <div className="category-item">
      <div className="category-item-details">
        <p>{name}</p>
        <p>11 tasks</p>

        <p>{dateCreated}</p>
      </div>

      <div className="category-item--button-container">
        <button
          onClick={handleActionsToggle}
          className="category-item--button button-actions"
        >
          actions
        </button>
        {isActionsOpen && (
          <div className="actions-menu">
            <ul className="actions-menu--list">
              <li className="actions-menu--item">Edit</li>
              <li className="actions-menu--item">Delete</li>
            </ul>
          </div>
        )}

        <button
          onClick={handleMoreClick}
          className="category-item--button button-more"
        >
          more
        </button>
      </div>
    </div>
  );
};

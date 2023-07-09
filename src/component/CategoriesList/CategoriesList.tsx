import { FC } from 'react';
import { Category } from '../../types';
import { Add } from '../Add';
import { CategoryItem } from '../CategoryItem';
import './CategoriesList.css';

export const CategoriesList: FC = () => {
  const categories: Category[] = [
    {
      id: 1,
      dateCreated: '08-07-2023',
      name: 'develop',
      userId: 1,
    },

    {
      id: 1,
      dateCreated: '08-07-2023',
      name: 'develop',
      userId: 1,
    },

    {
      id: 1,
      dateCreated: '08-07-2023',
      name: 'develop',
      userId: 1,
    },
  ];

  const type = 'category';

  return (
    <div className="categories-list">
      <Add type={type} />

      {categories.map((category) => (
        <CategoryItem category={category} />
      ))}
    </div>
  );
};

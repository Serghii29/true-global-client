import { FC } from 'react';
import { CategoriesList } from '../../component/CategoriesList';
import { CategoryModal } from '../../component/CategoryModal';

export const Home: FC = () => {
  const category = {
    id: 1,
    dateCreated: '08-07-2023',
    name: 'develop',
    userId: 1,
  };

  return (
    <>
      <h1>Home</h1>

      <CategoriesList />

      <CategoryModal
        type={'patch'}
        category={category}
        setVisibleModal={() => {}}
      />
    </>
  );
};

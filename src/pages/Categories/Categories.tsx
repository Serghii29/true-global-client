import { FC } from 'react';
import './Categories.css';
import { CategoriesList } from '../../component/CategoriesList';
// import { DeletePopup } from '../../component/DeletePopup';
// import { CategoryModal } from '../../component/CategoryModal';

export const Categories: FC = () => {
  // const category = {
  //   id: 1,
  //   dateCreated: '08-07-2023',
  //   name: 'develop',
  //   userId: 1,
  // };

  return (
    <>
      <CategoriesList />

      {/* <DeletePopup /> */}

      {/* <CategoryModal
        type={'patch'}
        category={category}
        setVisibleModal={() => {}}
      /> */}
    </>
  );
};

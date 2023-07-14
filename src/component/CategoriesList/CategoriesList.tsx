import { FC, useEffect } from 'react';
import { categoriesAsync } from '../../store/category/categorySlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Add } from '../Add';
import { CategoryItem } from '../CategoryItem';
import { CategoryModal } from '../CategoryModal';
import { DeletePopup } from '../DeletePopup';
import './CategoriesList.css';

export const CategoriesList: FC = () => {
  const { categories } = useAppSelector((state) => state.categories);
  const { isVisibleModal, isVisibleModalDelete } = useAppSelector(
    (state) => state.modal,
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(categoriesAsync());
  }, []);

  return (
    <div className="categories-list">
      <div className="categories-list--add-container">
        <Add type={'category'} />
      </div>

      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}

      {isVisibleModal && !isVisibleModalDelete && <CategoryModal />}

      {isVisibleModalDelete && !isVisibleModal && (
        <DeletePopup type="category" />
      )}
    </div>
  );
};

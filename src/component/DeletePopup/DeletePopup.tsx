import { FC } from 'react';
import './DeletePopup.css';

export const DeletePopup:FC = () => {
  return (
    <div className='delete-popup'>
      <span>Do you want delete this category?</span>

      <div className="delete-popup--button-container">
        <button className="delete-popup--button button--no">no</button>
        <button className="delete-popup--button button--yes">yes</button>
      </div>
    </div>
  );
};

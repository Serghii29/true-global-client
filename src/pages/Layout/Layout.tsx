import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../../component/Header';
import './Layout.css';

export const Layout: FC = () => {
  return (
    <div className='layout'>
      <Header />
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};

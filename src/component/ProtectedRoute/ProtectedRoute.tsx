import React, { FC } from 'react';
import { useAppSelector } from '../../store/hooks';
import './ProtectedRoute.css';

type Props = {
  children: React.JSX.Element;
};

export const ProtectedRoute: FC<Props> = ({ children }) => {
  const isAuth = useAppSelector((state) => state.user.isAuth);

  return (
    <>
      {isAuth ? (
        children
      ) : (
        <div className="route-massage">
          <h1>If you see this page, you must to register</h1>
        </div>
      )}
    </>
  );
};

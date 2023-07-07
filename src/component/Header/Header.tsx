import { FC } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { removeTokenFromLocalStorage } from '../../helpers/localStorage.helper';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { logout } from '../../store/user/userSlice';
import './Header.css';
// import { FaSignOutAlt } from 'react-icons/fa';

export const Header: FC = () => {
  const isAuth = useAppSelector<boolean>((state) => state.user.isAuth);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const logOutHandler = () => {
    dispatch(logout());
    removeTokenFromLocalStorage('token');
    toast.success('You logged out');
    navigate('/');
  };

  return (
    <header className="header">
      {isAuth && (
        <nav className="nav">
          <ul className="nav-list">
            <li className="nav-item">
              <NavLink
                to={'/'}
                className={({ isActive }) =>
                  isActive ? 'nav-link' : 'nav-link--active'
                }
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to={'/categories'}
                className={({ isActive }) =>
                  isActive ? 'nav-link' : 'nav-link--active'
                }
              >
                Categories
              </NavLink>
            </li>
          </ul>
        </nav>
      )}

      {isAuth ? (
        <button
          className="btn"
          onClick={logOutHandler}
        >
          <span>Log Out</span>
          {/* <FaSignOutAlt /> */}
        </button>
      ) : (
        <Link to={'/auth'}>Log In / Sing In</Link>
      )}
    </header>
  );
};

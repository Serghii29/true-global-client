import { FC } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Header.css';
// import { FaSignOutAlt } from 'react-icons/fa';

export const Header: FC = () => {
  const isAuth = false;

  return (
    <header className='header'>
      {isAuth && (
        <nav className='nav'>
          <ul className='nav-list'>
            <li className='nav-item'>
              <NavLink
                to={'/'}
                className={({ isActive }) => (
                  isActive ? 'nav-link' : 'nav-link--active'
                )}
              >
                Home
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink
                to={'/categories'}
                className={({ isActive }) => (
                  isActive ? 'nav-link' : 'nav-link--active'
                )}
              >
                Categories
              </NavLink>
            </li>
          </ul>
        </nav>
      )}

      {isAuth ? (
        <button className='btn' >
          <span>Log Out</span>
          {/* <FaSignOutAlt /> */}
        </button>
      ) : (
        <Link
          to={'/auth'}
        >
          Log In / Sing In
        </Link>
      )}
    </header>
  );
};

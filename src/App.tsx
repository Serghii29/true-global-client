import React, { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { toast } from 'react-toastify';
import './App.css';
import { getTokenFromLocalStorage } from './helpers/localStorage.helper';
import { router } from './router';
import { AuthService } from './services/auth.service';
import { useAppDispatch } from './store/hooks';
import { login, logout } from './store/user/userSlice';

function App() {
  const dispatch = useAppDispatch();

  const verificationAuth = async() => {
    const token = getTokenFromLocalStorage('token');

    try {
      if (token) {
        const data = await AuthService.getUser();

        if (data) {
          dispatch(login(data));
        } else {
          dispatch(logout());
        }
      }
    } catch (error: any) {
      const messageForError = error.response.data.message;

      toast.error(messageForError.toString());
    }
  };

  useEffect(() => {
    verificationAuth();
  }, []);

  return <RouterProvider router={router} />;
}

export default App;

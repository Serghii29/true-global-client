import React, { FC, useState } from 'react';
import { AuthService } from '../../services/auth.service';
import './Auth.css';
import { toast } from 'react-toastify';
import { setTokenToLocalStorage } from '../../helpers/localStorage.helper';
import { useAppDispatch } from '../../store/hooks';
import { login } from '../../store/user/userSlice';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

export const Auth: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // eslint-disable-next-line no-shadow
  const [name, setName] = useState('');
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  const loginHandler = async(e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      const data = await AuthService.login({
        email,
        password,
      });

      if (data) {
        setTokenToLocalStorage('token', data.access_token);
        dispatch(login(data));
        toast.success('You loged in!');
        navigate('/');
      }
    } catch (error: any) {
      const messageForError = error.response.data.message;

      toast.error(messageForError.toString());
    }
  };

  const dispatch = useAppDispatch();

  const registrationHandler = async(e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      const data = await AuthService.registration({
        email,
        password,
        name,
      });

      if (data) {
        toast.success('Account has been created');
        setIsLogin(!isLogin);
      }
    } catch (error: any) {
      const messageForError = error.response.data.message;

      toast.error(messageForError.toString());
    }
  };

  return (
    <div className="login">
      <h1>{isLogin ? 'Login' : 'Registration'}</h1>
      <form
        className="form"
        onSubmit={isLogin ? loginHandler : registrationHandler}
      >
        <TextField
          fullWidth
          type="text"
          placeholder="email"
          value={email}
          onChange={({ target }) => setEmail(target.value)}
        />
        <TextField
          fullWidth
          type="password"
          placeholder="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
        {!isLogin && (
          <TextField
            fullWidth
            type="text"
            placeholder="name"
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        )}

        <Button color="primary" variant="contained" fullWidth type="submit">
          Submit
        </Button>
      </form>

      <div className="button-container">
        {isLogin ? (
          <button
            className="button button--primary"
            onClick={() => setIsLogin(!isLogin)}
          >
            You don't have an account?
          </button>
        ) : (
          <button
            className="button button--secondary"
            onClick={() => setIsLogin(!isLogin)}
          >
            Already have an account?
          </button>
        )}
      </div>
    </div>
  );
};

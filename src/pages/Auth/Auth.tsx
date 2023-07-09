import React, { FC, useState } from 'react';
import { AuthService } from '../../services/auth.service';
import './Auth.css';
import { toast } from 'react-toastify';
import { setTokenToLocalStorage } from '../../helpers/localStorage.helper';
import { useAppDispatch } from '../../store/hooks';
import { login } from '../../store/user/userSlice';
import { useNavigate } from 'react-router-dom';

export const Auth: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // eslint-disable-next-line no-shadow
  const [name, setName] = useState('');
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

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
        navigate('/categories');
      }
    } catch (error: any) {
      const messageForError = error.response.data.message;

      toast.error(messageForError.toString());
    }
  };

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
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={({ target }) => setEmail(target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
        {!isLogin && (
          <input
            type="text"
            placeholder="name"
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        )}

        <button className="form-submit">Submit</button>
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

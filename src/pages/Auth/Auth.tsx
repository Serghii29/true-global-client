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
import { useFormik } from 'formik';
import * as yup from 'yup';

export const Auth: FC = () => {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  const loginSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required'),
  });

  const registrationSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup
      .string()
      .required('Password is required')
      .min(8, 'Password should be of minimum 8 characters length'),
    name: yup.string().required('Name is required'),
  });

  const handleLogin = async(value: any) => {
    try {
      const data = await AuthService.login(value);

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

  const handleRegistration = async(value: any) => {
    try {
      const data = await AuthService.registration(value);

      if (data) {
        toast.success('Account has been created');
        setIsLogin(!isLogin);
      }
    } catch (error: any) {
      const messageForError = error.response.data.message;

      toast.error(messageForError.toString());
    }
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      name: '',
    },
    validationSchema: isLogin ? loginSchema : registrationSchema,
    onSubmit: (values: any) => {
      if (isLogin) {
        handleLogin(values);
      } else {
        handleRegistration(values);
      }
    },
  });

  const {
    handleSubmit,
    handleChange,
    values: formValues,
    errors,
    handleBlur,
  } = formik;

  return (
    <div className="login">
      <h1>{isLogin ? 'Login' : 'Registration'}</h1>
      <form className="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          value={formValues.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={formik.touched.email && Boolean(errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="password"
          value={formValues.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={formik.touched.password && Boolean(errors.password)}
          helperText={formik.touched.password && errors.password}
        />
        {!isLogin && (
          <TextField
            fullWidth
            type="text"
            placeholder="name"
            value={formValues.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={formik.touched.name && Boolean(errors.name)}
            helperText={formik.touched.name && errors.name}
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

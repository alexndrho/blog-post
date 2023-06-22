import { useAuth } from '../../context/useAuth';
import { styled } from '../../stitches.config';
import { logIn } from '../../utils/authApi';
import {
  Title,
  Form,
  Label,
  Input,
  Button,
} from '../../components/common/form';
import ErrorMessage from '../../components/layout/ErrorMessage';

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Main = styled('main', {
  minHeight: '80%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
});

const Login = () => {
  const { isLoggedIn, setLoggedIn } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) navigate('/');
  }, [isLoggedIn, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoggingIn(true);
    try {
      const data = await logIn(username, password, setLoggedIn);

      if (data?.error?.message) {
        throw new Error(data.error.message + '!');
      } else if (data?.token) {
        localStorage.setItem('token', data.token);

        setIsLoggingIn(false);
        navigate('/');
      } else {
        throw new Error('Something went wrong!');
      }
    } catch (err) {
      setIsLoggingIn(false);
      if (err instanceof Error) {
        setErrorMessage(err.message);
      }
    }
  };

  return (
    <Main>
      <Form onSubmit={handleLogin} size="fullscreen">
        <Title>Log in</Title>
        {errorMessage !== '' ? <ErrorMessage message={errorMessage} /> : <></>}
        <Label
          htmlFor="form-username"
          mb0_5
          css={{ marginTop: errorMessage === '' ? 0 : '1rem' }}
        >
          Username:
        </Label>
        <Input
          id="form-username"
          onChange={(e) => setUsername(e.target.value)}
          mb1
        />
        <Label htmlFor="form-password" mb0_5>
          Password:
        </Label>
        <Input
          id="form-password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          mb1
        />
        <Button type="submit" disabled={isLoggingIn}>
          {isLoggingIn ? 'Logging in...' : 'Log in'}
        </Button>
      </Form>
    </Main>
  );
};

export default Login;

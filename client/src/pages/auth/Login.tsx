import { useAuth } from '../../context/useAuth';
import stitches from '../../stitches.config';
import { ILoginResponse } from '../../types/IUser';
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

const { styled } = stitches;

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
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) navigate('/');
  }, [isLoggedIn, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL_SERVER}/login`,
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        }
      );

      const responseData: ILoginResponse = await response.json();

      if (responseData.success) {
        localStorage.setItem('token', responseData.token);
        setErrorMessage('');
        setLoggedIn();
        navigate('/');
      } else if (responseData.message) {
        setErrorMessage(responseData.message + '!');
      }
    } catch (err) {
      console.error(err);
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
        <Button>Submit</Button>
      </Form>
    </Main>
  );
};

export default Login;

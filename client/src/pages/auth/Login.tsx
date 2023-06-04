import { useAuth } from '../../context/useAuth';
import stitches from '../../stitches.config';
import { logIn } from '../../utils/userApi';
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

    logIn(username, password)
      .then((data) => {
        if (data?.error?.message) {
          setErrorMessage(data.error.message + '!');
        } else if (data?.token) {
          localStorage.setItem('token', data.token);
          setLoggedIn();
          navigate('/');
        } else {
          setErrorMessage('Something went wrong!');
        }
      })
      .catch((err) => {
        console.error(err);
      });
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

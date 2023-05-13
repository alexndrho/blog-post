import stitches from '../../stitches.config';
import { Form, Label, Input, Button } from '../stitches/form';

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const { styled } = stitches;

const Main = styled('main', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const Title = styled('h2', {
  marginBottom: '1rem',
  fontSize: '$title',
});

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

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

      const responseData = await response.json();
      if (responseData.message === 'Success') {
        localStorage.setItem('token', responseData.token);
        navigate('/');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Main>
      <Form onSubmit={handleLogin} size="fullscreen">
        <Title>Log in</Title>
        <Label htmlFor="form-username" mb0_5>
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

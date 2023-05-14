import stitches from '../../stitches.config';
import { Form, Label, Input, Button } from '../stitches/form';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const { styled } = stitches;

const Main = styled('main', {
  minHeight: '80%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
});

const Title = styled('h2', {
  marginBottom: '1rem',
  fontSize: '$title',
});

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL_SERVER}/register`,
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({ username, email, password }),
        }
      );

      const responseData = await response.json();
      if (responseData.message === 'Success') navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Main>
      <Form onSubmit={handleSubmit} size="fullscreen">
        <Title>Sign Up</Title>
        <Label htmlFor="form-username" mb0_5>
          Username:
        </Label>
        <Input
          id="form-username"
          onChange={(e) => setUsername(e.target.value)}
          mb1
        />

        <Label htmlFor="form-email" mb0_5>
          Email:
        </Label>
        <Input
          id="form-email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
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

export default SignUp;

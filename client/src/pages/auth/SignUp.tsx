import { useAuth } from '../../context/useAuth';
import stitches from '../../stitches.config';
import { signUpResponse } from '../../types/authentication';
import {
  Form,
  Title,
  Label,
  Input,
  Button,
  Info,
} from '../../components/common/form';
import ErrorMessage from '../../components/layout/ErrorMessage';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const { styled } = stitches;

const Main = styled('main', {
  minHeight: '80%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
});

const A = styled('a', {
  color: 'Black',
});

const SignUp = () => {
  const { isLoggedIn } = useAuth();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) navigate('/');
  }, [isLoggedIn, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL_SERVER}/signup`,
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({ username, email, password }),
        }
      );

      const responseData: signUpResponse = await response.json();

      if (responseData.success) {
        setErrorMessage('');
        navigate('/login');
      } else if (responseData.message) {
        setErrorMessage(responseData.message + '!');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Main>
      <Form onSubmit={handleSubmit} size="fullscreen">
        <Title>Sign Up</Title>
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
        <Info>
          Already have an account?{' '}
          <A as={Link} to="/login">
            Log in
          </A>
        </Info>
      </Form>
    </Main>
  );
};

export default SignUp;

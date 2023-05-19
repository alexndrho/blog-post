import { useAuth } from '../../context/useAuth';
import stitches from '../../stitches.config';
import { signUpResponse } from '../../types/authentication';
import { Form, Label, Input, Button } from '../../components/stitches/form';
import ErrorMessage from '../../components/auth/ErrorMessage';
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

const Title = styled('h2', {
  marginBottom: '1rem',
  fontSize: '$title',
});

const P = styled('p', {
  marginTop: '0.75rem',
  fontSize: '$s',
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

      if (responseData.message === 'Success') {
        setErrorMessage('');
        navigate('/login');
      } else if (responseData.error) {
        setErrorMessage(responseData.error);
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
        <P>
          Already have an account?{' '}
          <A as={Link} to="/login">
            Log in
          </A>
        </P>
      </Form>
    </Main>
  );
};

export default SignUp;

import stitches from '../stitches.config';

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const { styled } = stitches;

const Main = styled('main', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const H2 = styled('h2', {
  marginBottom: '1rem',
  fontSize: '$m',
});

const Form = styled('form', {
  width: '80%',
  maxWidth: '80%',
  minHeight: 'calc(100vh - $navHeight * 2)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  fontWeight: '500',

  '@desktop': {
    width: '40%',
  },
});

const Label = styled('label', {
  marginBottom: '0.5rem',
  fontSize: '$s',
});

const Input = styled('input', {
  height: '3rem',
  border: 'solid 0.09rem $lightGray',
  borderRadius: '0.5rem',
  padding: '0 0.7rem',
  marginBottom: '1rem',
  fontSize: '$s',
  fontFamily: 'inherit',
  fontWeight: 'inherit',
  outline: 'none',

  '&:focus': {
    borderColor: 'Black',
  },
});

const TextArea = styled('textarea', {
  border: 'solid 0.09rem $lightGray',
  borderRadius: '0.5rem',
  height: '15rem',
  padding: '0.75rem',
  marginBottom: '1rem',
  fontFamily: 'inherit',
  fontSize: '$s',
  fontWeight: 'inherit',
  outline: 'none',
  resize: 'none',

  '&:focus': {
    borderColor: 'Black',
  },
});

const Button = styled('button', {
  height: '3rem',
  border: 'none',
  borderRadius: '0.5rem',
  backgroundColor: 'Black',
  color: 'White',
  fontFamily: 'inherit',
  fontSize: '$s',
  fontWeight: 'inherit',
});

const CreateBlog = () => {
  const [title, setTitle] = useState('');
  const [snippet, setSnippet] = useState('');
  const [body, setBody] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(import.meta.env.VITE_BASE_URL_SERVER);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL_SERVER}/blogs`,
        {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title, snippet, body }),
        }
      );

      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);

      const responseData = await response.json();

      navigate(`/blogs/${responseData._id}`);
    } catch (err) {
      console.error('Error: ' + err);
    }
  };

  return (
    <Main>
      <Form onSubmit={handleSubmit}>
        <H2>Create Blog</H2>
        <Label htmlFor="form-title">Title:</Label>
        <Input id="form-title" onChange={(e) => setTitle(e.target.value)} />
        <Label htmlFor="form-snippet">Snippet:</Label>
        <Input id="form-snippet" onChange={(e) => setSnippet(e.target.value)} />
        <Label htmlFor="form-body">Body:</Label>
        <TextArea id="form-body" onChange={(e) => setBody(e.target.value)} />
        <Button>Submit</Button>
      </Form>
    </Main>
  );
};

export default CreateBlog;

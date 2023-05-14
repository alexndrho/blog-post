import stitches from '../../stitches.config';
import {
  Form,
  Label,
  Input,
  TextArea,
  Button,
} from '../../components/stitches/form';

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

const H2 = styled('h2', {
  marginBottom: '1rem',
  fontSize: '$m',

  '@tablet': {
    fontSize: '$title',
  },
});

const CreateBlog = () => {
  const [title, setTitle] = useState('');
  const [snippet, setSnippet] = useState('');
  const [body, setBody] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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
      <Form onSubmit={handleSubmit} size="fullscreen">
        <H2>Create Blog</H2>
        <Label htmlFor="form-title" mb0_5>
          Title:
        </Label>
        <Input id="form-title" onChange={(e) => setTitle(e.target.value)} mb1 />
        <Label htmlFor="form-snippet" mb0_5>
          Snippet:
        </Label>
        <Input
          id="form-snippet"
          onChange={(e) => setSnippet(e.target.value)}
          mb1
        />
        <Label htmlFor="form-body" mb0_5>
          Body:
        </Label>
        <TextArea
          id="form-body"
          onChange={(e) => setBody(e.target.value)}
          mb1
        />
        <Button>Submit</Button>
      </Form>
    </Main>
  );
};

export default CreateBlog;

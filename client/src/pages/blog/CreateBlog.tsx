import stitches from '../../stitches.config';
import LoginToContinue from '../LoginToContinue';
import { createBlog } from '../../utils/blogsApi';
import {
  Form,
  Title,
  Label,
  Input,
  TextArea,
  Button,
} from '../../components/common/form';

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';

const { styled } = stitches;

const Main = styled('main', {
  minHeight: '80%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
});

const CreateBlog = () => {
  const { isLoggedIn } = useAuth();
  const [title, setTitle] = useState('');
  const [snippet, setSnippet] = useState('');
  const [body, setBody] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    createBlog(title, snippet, body)
      .then((blog) => {
        if (blog?.error) throw new Error(blog.error.message);

        if (blog) {
          navigate(`/blogs/${blog.id}`);
        } else {
          throw new Error('No blog found');
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      {!isLoggedIn ? (
        <LoginToContinue />
      ) : (
        <Main>
          <Form onSubmit={handleSubmit} size="fullscreen">
            <Title>Create Blog</Title>
            <Label htmlFor="form-title" mb0_5>
              Title:
            </Label>
            <Input
              id="form-title"
              onChange={(e) => setTitle(e.target.value)}
              mb1
            />
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
      )}
    </>
  );
};

export default CreateBlog;

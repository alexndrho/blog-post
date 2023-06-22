import { styled } from '../../stitches.config';
import { useAuth } from '../../context/useAuth';
import LoginToContinue from '../LoginToContinue';
import { createBlog } from '../../utils/blogsApi';
import {
  Form,
  Title,
  Label,
  Input,
  TextArea,
  Button,
  Select,
  Option,
} from '../../components/common/form';

import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Main = styled('main', {
  minHeight: '80%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
});

const BodyLabelContainer = styled('div', {
  marginBottom: '0.5em',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const CreateBlog = () => {
  const { isLoggedIn } = useAuth();
  const [creatingBlog, setCreatingBlog] = useState(false);

  const [title, setTitle] = useState('');
  const [snippet, setSnippet] = useState('');
  const [body, setBody] = useState('');
  const textFormatRef = useRef<HTMLSelectElement | null>(null);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (creatingBlog) return;
    if (!textFormatRef.current) throw new Error('No format selected');

    setCreatingBlog(true);
    createBlog(title, snippet, body, textFormatRef.current.value)
      .then((blog) => {
        if (blog?.error) throw new Error(blog.error.message);

        if (blog) {
          navigate(`/blogs/${blog.id}`);
        } else {
          throw new Error('No blog found');
        }
      })
      .catch((err) => {
        setCreatingBlog(false);
        console.error(err);
      });
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

            <BodyLabelContainer>
              <Label htmlFor="form-body" mb0_5 css={{ marginBottom: '0' }}>
                Body:
              </Label>

              <Select ref={textFormatRef}>
                <Option value="markdown">Markdown</Option>
                <Option value="html">HTML</Option>
              </Select>
            </BodyLabelContainer>
            <TextArea
              id="form-body"
              onChange={(e) => setBody(e.target.value)}
              mb1
            />
            <Button>{!creatingBlog ? 'Create' : 'Creating...'}</Button>
          </Form>
        </Main>
      )}
    </>
  );
};

export default CreateBlog;

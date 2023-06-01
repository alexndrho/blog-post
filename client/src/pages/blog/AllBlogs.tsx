import BlogItem from '../../components/layout/BlogItem';
import stitches from '../../stitches.config';

import { useEffect, useState } from 'react';

const { styled } = stitches;

const Main = styled('main', {
  margin: '0 auto',
  padding: '2rem 0',
  width: '80%',

  '@desktop': {
    maxWidth: '$contentWidthS',
  },
});

const Title = styled('h2', {
  marginBottom: '1rem',
  fontSize: '$m',
  fontWeight: '700',

  '@desktop': {
    marginBottom: '1.5rem',
    fontSize: '$title',
  },
});

const AllBlogs = () => {
  const [blogs, setBlogs] = useState<IBlog[] | null>(null);
  const [userNames, setUserNames] = useState<string[] | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const responseBlog = await fetch(
          `${import.meta.env.VITE_BASE_URL_SERVER}/blogs/`,
          {
            method: 'GET',
            headers: {
              Accept: 'application/json',
            },
          }
        );

        if (!responseBlog.ok) throw new Error('Could not fetch blogs');

        const responseDataBlog = await responseBlog.json();
        setBlogs(responseDataBlog);
      } catch (err) {
        console.log(err);
      }
    };

    getData();
  }, []);

  useEffect(() => {
    const getUserNames = async () => {
      try {
        const names = await Promise.all(
          blogs?.map(async (blog) => {
            const response = await fetch(
              `${import.meta.env.VITE_BASE_URL_SERVER}/user/username/${
                blog.userId
              }`,
              {
                headers: {
                  Accept: 'application/json',
                },
              }
            );

            if (!response.ok) throw new Error('Could not fetch username');

            const responseData = await response.json();
            return responseData.username;
          }) ?? []
        );

        setUserNames(names);
      } catch (err) {
        console.log(err);
      }
    };

    if (blogs) getUserNames();
  }, [blogs]);

  return (
    <Main>
      {!userNames ? (
        <Title>Loading...</Title>
      ) : (
        blogs?.map((blog, index) => (
          <BlogItem
            key={blog._id}
            _id={blog._id}
            username={userNames[index]}
            title={blog.title}
            snippet={blog.snippet}
            createdAt={blog.createdAt}
          />
        ))
      )}
    </Main>
  );
};

export default AllBlogs;

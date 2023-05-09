import BlogItem from './BlogItem';
import stitches from '../stitches.config';

import { useEffect, useState } from 'react';

const { styled } = stitches;

const Main = styled('main', {
  margin: '0 auto',
  padding: '3rem 0',
  width: '80%',

  '@desktop': {
    marginTop: '1rem',
    width: '60%',
  },
});

const Title = styled('h2', {
  marginBottom: '1rem',
  fontSize: '$m',
  fontWeight: '700',

  '@desktop': {
    marginBottom: '2rem',
    fontSize: '$l',
  },
});

const AllBlogs = () => {
  const [blogs, setBlogs] = useState<{ blogs: IBlog[] } | null>({ blogs: [] });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL_SERVER}/blogs/`,
          {
            method: 'GET',
          }
        );

        const responseData = await response.json();
        setBlogs(responseData);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        console.log(err);
      }
    };

    getData();
  }, []);

  return (
    <Main>
      <Title>{isLoading ? 'Loading...' : 'Blogs'}</Title>
      {blogs?.blogs.map((blog) => (
        <BlogItem
          key={blog._id}
          _id={blog._id}
          title={blog.title}
          snippet={blog.snippet}
        />
      ))}
    </Main>
  );
};

export default AllBlogs;

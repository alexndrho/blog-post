import BlogItem from '../../components/blog/BlogItem';
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
            headers: {
              Accept: 'application/json',
            },
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
      {isLoading ? (
        <Title>Loading...</Title>
      ) : (
        blogs?.blogs.map((blog) => (
          <BlogItem
            key={blog._id}
            _id={blog._id}
            username={blog.username}
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

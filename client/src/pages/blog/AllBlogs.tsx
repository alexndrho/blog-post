import { styled } from '../../stitches.config';
import BlogItem from '../../components/layout/BlogItem';
import PaginationBar from '../../components/layout/PaginationBar';
import { getBlogs, getBlogsUsernames } from '../../utils/blogsApi';
import IBlog from '../../types/IBlog';

import { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';

const Main = styled('main', {
  margin: '0 auto',
  padding: '2rem 0',
  width: '80%',
  display: 'flex',
  flexDirection: 'column',

  '@desktop': {
    maxWidth: '$contentWidthS',
  },
});

const Title = styled('h2', {
  marginBottom: '1rem',
  fontSize: '$3',
  fontWeight: '700',

  '@desktop': {
    marginBottom: '1.5rem',
    fontSize: '$title',
  },
});

const AllBlogs = () => {
  const location = useLocation();
  const page = new URLSearchParams(location.search).get('page');
  const [blogs, setBlogs] = useState<IBlog | null>(null);
  const [usernames, setUsernames] = useState<string[] | null>(null);

  useMemo(() => {
    setBlogs(null);
    setUsernames(null);

    getBlogs(page ? parseInt(page) : 1)
      .then((blogs) => {
        if (blogs?.error) throw new Error(blogs.error.message);

        if (blogs) {
          setBlogs(blogs as IBlog);
        } else {
          throw new Error('No blogs found');
        }
      })
      .catch((err) => console.error(err));
  }, [page]);

  useMemo(() => {
    if (!blogs) return;

    getBlogsUsernames(blogs.dataBlogs)
      .then((usernames) => {
        if (usernames) {
          setUsernames(usernames);
        } else {
          throw new Error('No usernames found');
        }
      })
      .catch((err) => console.error(err));
  }, [blogs]);

  return (
    <Main>
      {!usernames ? (
        <Title>Loading...</Title>
      ) : (
        <>
          {blogs?.dataBlogs.map((blog, index) => (
            <BlogItem
              key={blog._id}
              _id={blog._id}
              username={usernames[index]}
              title={blog.title}
              snippet={blog.snippet}
              createdAt={blog.createdAt}
            />
          ))}

          {blogs && (
            <PaginationBar
              route={'/blogs'}
              currentPage={page ? parseInt(page) : 1}
              totalPages={blogs.totalPages}
            />
          )}
        </>
      )}
    </Main>
  );
};

export default AllBlogs;

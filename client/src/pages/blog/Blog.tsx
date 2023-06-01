import stitches from '../../stitches.config';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NotFound from '../NotFound';
import IBlog from '../../types/IBlog';

const { styled } = stitches;

const Main = styled('main', {
  margin: '0 auto',
  padding: '3rem 0',
  width: '80%',
  maxWidth: '$contentWidthS',
});

const TitleBlog = styled('h2', {
  fontSize: '$s',
  '@desktop': {
    fontSize: '$m',
  },
});

const Info = styled('p', {
  marginBottom: '$fontSizes$xs',
  color: 'DimGray',
  fontSize: '0.85rem',
  fontWeight: 500,

  '@desktop': {
    marginBottom: '$fontSizes$s',
    fontSize: '$xs',
  },
});

const BodyBlog = styled('p', {
  textAlign: 'justify',
  fontSize: '$xs',
  marginBottom: '$fontSizes$xs',

  '@desktop': {
    fontSize: '$s',
    marginBottom: '$fontSizes$s',
  },
});

const Blog = () => {
  const { id } = useParams();
  const [blogData, setBlogData] = useState<IBlog | null>({
    _id: '',
    userId: '',
    title: '',
    snippet: '',
    body: '',
  });
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL_SERVER}/blogs/${id}`,
          {
            method: 'GET',
            headers: {
              Accept: 'application/json',
            },
          }
        );

        const responseData = await response.json();
        setBlogData(responseData);
      } catch (err) {
        console.error(err);
      }
    };

    getData();
  }, [id]);

  useEffect(() => {
    const getUserNames = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL_SERVER}/user/username/${
            blogData?.userId
          }`,
          {
            headers: {
              Accept: 'application/json',
            },
          }
        );

        if (!response.ok) throw new Error('Could not fetch username');

        const responseData = await response.json();
        setUserName(responseData.username);
      } catch (err) {
        console.log(err);
      }
    };

    if (blogData?.userId) getUserNames();
  }, [blogData?.userId]);

  return (
    <>
      {blogData == null ? (
        <NotFound />
      ) : (
        <Main>
          <TitleBlog>
            {blogData && userName ? blogData.title : 'Loading...'}
          </TitleBlog>

          {blogData && userName && (
            <>
              <Info>
                By {userName} -{' '}
                {new Intl.DateTimeFormat('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                }).format(new Date(blogData?.updatedAt as string))}
              </Info>

              {blogData?.body
                .split(/[\n\r]/)
                .filter((item) => item.trim() !== '')
                .map((paragraph) => (
                  <BodyBlog key={crypto.randomUUID()}>{paragraph}</BodyBlog>
                ))}
            </>
          )}
        </Main>
      )}
    </>
  );
};

export default Blog;

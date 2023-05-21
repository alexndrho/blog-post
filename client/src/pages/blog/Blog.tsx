import stitches from '../../stitches.config';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NotFound from '../NotFound';

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
    username: '',
    title: 'Loading...',
    snippet: '',
    body: '',
  });
  const [isloading, setIsLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
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
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        console.error(err);
      }
    };

    getData();
  }, [id]);

  return (
    <>
      {!isloading && blogData == null ? (
        <NotFound />
      ) : (
        <Main>
          <TitleBlog>{blogData?.title}</TitleBlog>
          {blogData?.updatedAt ? (
            <Info>
              By {blogData.username} -{' '}
              {new Intl.DateTimeFormat('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              }).format(new Date(blogData?.updatedAt as string))}
            </Info>
          ) : (
            <></>
          )}
          {blogData?.body
            .split(/[\n\r]/)
            .filter((item) => item.trim() !== '')
            .map((paragraph) => (
              <BodyBlog key={crypto.randomUUID()}>{paragraph}</BodyBlog>
            ))}
        </Main>
      )}
    </>
  );
};

export default Blog;

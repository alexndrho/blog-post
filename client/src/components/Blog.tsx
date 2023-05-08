import stitches from '../stitches.config';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NotFound from './NotFound';

const { styled } = stitches;

const Main = styled('main', {
  margin: '0 auto',
  padding: '3rem 0',
  width: '80%',
  maxWidth: '1250px',
});

const Title = styled('h2', {
  marginBottom: '0.75rem',
  fontSize: '$l',
});

const Body = styled('p', {
  fontSize: '$s',
  textAlign: 'justify',
});

const Blog = () => {
  const { id } = useParams();
  const [blogData, setBlogData] = useState<IBlog | null>({
    _id: '',
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
      {!isloading &&
      (JSON.stringify(blogData) === '{}' || blogData === null) ? (
        <NotFound />
      ) : (
        <Main>
          <Title>{blogData?.title}</Title>
          <Body>{blogData?.body}</Body>
        </Main>
      )}
    </>
  );
};

export default Blog;

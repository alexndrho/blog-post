import stitches from '../../stitches.config';
import { TitleBlog, BodyBlog } from '../../components/stitches/blog';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NotFound from '../NotFound';

const { styled } = stitches;

const Main = styled('main', {
  margin: '0 auto',
  padding: '3rem 0',
  width: '80%',
  maxWidth: '$contentWidth',
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
          <TitleBlog mb1>{blogData?.title}</TitleBlog>
          <BodyBlog>{blogData?.body}</BodyBlog>
        </Main>
      )}
    </>
  );
};

export default Blog;
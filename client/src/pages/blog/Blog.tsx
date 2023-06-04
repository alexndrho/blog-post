import stitches from '../../stitches.config';
import { getBlog, getBlogsUsernames } from '../../utils/blogsApi';
import NotFound from '../NotFound';
import IBlog from '../../types/IBlog';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

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
  const [blogData, setBlogData] = useState<IBlog | null>(null);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    getBlog(id)
      .then((blog) => {
        if (blog?.error) throw new Error(blog.error.message);

        if (blog) {
          setBlogData(blog as IBlog);
        } else {
          throw new Error('No blog found');
        }
      })
      .catch((err) => console.error(err));
  }, [id]);

  useEffect(() => {
    if (!blogData) return;

    getBlogsUsernames([blogData])
      .then((usernames) => {
        if (usernames?.length === 1) {
          setUserName(usernames[0]);
        } else {
          throw new Error('No usernames found');
        }
      })
      .catch((err) => console.error(err));
  }, [blogData]);

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

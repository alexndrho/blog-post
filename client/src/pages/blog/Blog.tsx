import { styled } from '../../stitches.config';
import { UsernameLink } from '../../components/common/UsernameLink';
import { getBlog, getBlogsUsernames } from '../../utils/blogsApi';
import NotFound from '../NotFound';
import { IBlogData } from '../../types/IBlog';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

const Main = styled('main', {
  margin: '0 auto',
  padding: '3rem 0',
  width: '80%',
  maxWidth: '$contentWidthS',
});

const TitleBlog = styled('h2', {
  fontSize: '3rem',
  '@desktop': {
    fontSize: '3.25rem',
  },
});

const Info = styled('p', {
  marginBottom: '$fontSizes$5',
  color: 'DimGray',
  fontSize: 'm-5',
  fontWeight: 500,

  '@desktop': {
    marginBottom: '$fontSizes$5',
    fontSize: '$5',
  },
});

const Content = styled('section');

const Blog = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [blogData, setBlogData] = useState<IBlogData | null>(null);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    getBlog(id)
      .then((blog) => {
        if (blog?.error) throw new Error(blog.error.message);

        if (blog && blog.body) {
          if (blog.format === 'markdown') {
            blog.body = marked(blog.body);
          }

          blog.body = DOMPurify.sanitize(blog.body);
          setBlogData(blog as IBlogData);
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
          setLoading(false);
        } else {
          throw new Error('No usernames found');
        }
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
      });
  }, [blogData]);

  return (
    <>
      {blogData == null && !loading ? (
        <NotFound />
      ) : (
        <Main>
          <TitleBlog>
            {blogData && userName ? blogData.title : 'Loading...'}
          </TitleBlog>

          {blogData && userName && (
            <>
              <Info>
                By{' '}
                <UsernameLink as={Link} to={`/${userName}`}>
                  {userName}
                </UsernameLink>{' '}
                -{' '}
                {new Intl.DateTimeFormat('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                }).format(new Date(blogData?.updatedAt as string))}
              </Info>

              <Content
                className="blog-content"
                dangerouslySetInnerHTML={{ __html: blogData.body }}
              />
            </>
          )}
        </Main>
      )}
    </>
  );
};

export default Blog;

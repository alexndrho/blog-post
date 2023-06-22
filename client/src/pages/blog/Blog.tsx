import { styled } from '../../stitches.config';
import { useUser } from '../../context/useUser';
import { UsernameLink } from '../../components/common/UsernameLink';
import Modal from '../../components/layout/Modal';
import NotFound from '../NotFound';
import { deleteBlog, getBlog, getBlogsUsernames } from '../../utils/blogsApi';
import EditBlog from '../../components/layout/EditBlog';
import { IBlogData } from '../../types/IBlog';
import meatballMenuIcon from '../../assets/images/meatball-menu.png';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

const Main = styled('main', {
  margin: '0 auto',
  padding: '3rem 0',
  width: '80%',
  maxWidth: '$contentWidthS',
  fontSize: '$m-1',

  '@desktop': {
    fontSize: '$2',
  },
});

const TopContainer = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
});

const TitleInfoContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
});

const TitleBlog = styled('h2', {
  fontSize: '1em',
});

const Info = styled('p', {
  color: 'DimGray',
  fontSize: '0.45em',
  fontWeight: 500,
});

const EditContainer = styled('div', {
  position: 'relative',
  marginLeft: '0.75em',
});

const Icon = styled('img');

const EditButton = styled('button', {
  fontSize: '0.5em',
  width: '1em',
  height: '1em',
  border: 'none',
  padding: 0,
  backgroundColor: 'transparent',

  [`& ${Icon}`]: {
    width: '100%',
    height: '100%',
  },
});

const EditMenu = styled('dialog', {
  position: 'absolute',
  inset: 'auto 0 auto auto',

  border: 'none',
  borderRadius: '0.125em',
  padding: '0.125em 0',
  backgroundColor: 'Black',
  color: 'White',
});

const EditItem = styled('button', {
  width: '100%',
  padding: '0.35em 0.5em',
  display: 'block',
  border: 'none',
  backgroundColor: 'transparent',
  fontFamily: 'inherit',
  fontSize: '$m-5',
  fontWeight: '500',
  color: 'inherit',
  overflow: 'hidden',
  textOverflow: 'ellipsis',

  '@desktop': {
    fontSize: '$5',
  },

  '&:hover': {
    backgroundColor: 'Gray',
  },
});

const Divider = styled('div', {
  width: '100%',
  height: '0.125rem',
  backgroundColor: 'Black',
  margin: '1rem 0 1.5rem 0',

  '@desktop': {
    margin: '1rem 0 2rem 0',
  },
});

const Content = styled('section');

const Blog = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const { user } = useUser();

  const [loading, setLoading] = useState<boolean>(true);
  const [blogData, setBlogData] = useState<IBlogData | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [parsedBody, setParsedBody] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isShowModalDelete, setIsShowModalDelete] = useState<boolean>(false);

  const editMenuRef = useRef<HTMLDialogElement>(null);

  // callbacks
  const updateBlog = useCallback(async () => {
    if (!id) return;

    try {
      setLoading(true);
      const blog = await getBlog(id);

      if (blog?.error) throw new Error(blog.error.message);
      if (!(blog && blog.body)) throw new Error('No blog found');

      let parsedBody = blog.body;
      if (blog.format === 'markdown') {
        parsedBody = marked(blog.body);
      }

      parsedBody = DOMPurify.sanitize(parsedBody);
      setParsedBody(parsedBody);

      setBlogData(blog as IBlogData);

      const usernames = await getBlogsUsernames([blog as IBlogData]);
      if (!usernames) throw new Error('No username found');

      setUsername(usernames[0]);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  }, [id]);

  // effects
  useEffect(() => {
    updateBlog();
  }, [updateBlog]);

  const toggleEditMenu = () => {
    if (editMenuRef.current?.open) {
      editMenuRef.current.close();
    } else {
      editMenuRef.current?.show();
    }
  };

  // modal handlers
  const showModalDelete = () => {
    setIsShowModalDelete(true);
  };

  const hideModalDelete = () => {
    setIsShowModalDelete(false);
  };

  // handlers
  const handleEdit = () => {
    setIsEditing(true);
    toggleEditMenu();
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    updateBlog();
  };

  const handleDelete = async () => {
    if (!id) return;

    toggleEditMenu();

    try {
      const blog = await deleteBlog(id);

      if (blog?.error) throw new Error(blog.error.message);

      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  if (blogData == null && !loading) return <NotFound />;

  return (
    <Main>
      {!(blogData && username && parsedBody) ? (
        <TitleBlog>Loading...</TitleBlog>
      ) : (
        <>
          <TopContainer>
            <TitleInfoContainer>
              <TitleBlog>{blogData?.title}</TitleBlog>
              <Info>
                By{' '}
                <UsernameLink as={Link} to={`/${username}`}>
                  {username}
                </UsernameLink>{' '}
                -{' '}
                {new Intl.DateTimeFormat('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                }).format(new Date(blogData?.updatedAt as string))}
              </Info>
            </TitleInfoContainer>

            {user?.username === username && (
              <EditContainer>
                <EditButton onClick={toggleEditMenu}>
                  <Icon src={meatballMenuIcon} alt="menu-icon" />
                </EditButton>

                <EditMenu ref={editMenuRef}>
                  <EditItem onClick={handleEdit}>Edit</EditItem>
                  <EditItem onClick={showModalDelete}>Delete</EditItem>
                </EditMenu>
              </EditContainer>
            )}
          </TopContainer>

          <Divider />

          <Modal
            show={isShowModalDelete}
            message={`Are you sure you want to delete "${blogData.title}"?`}
            btnText="Delete"
            onConfirm={handleDelete}
            onCancel={hideModalDelete}
            btnColor="inverted"
          />

          {isEditing ? (
            <EditBlog
              id={blogData._id}
              title={blogData.title}
              snippet={blogData.snippet}
              body={blogData.body}
              format={blogData.format}
              onCancel={handleCancelEdit}
            />
          ) : (
            <Content
              className="blog-content"
              dangerouslySetInnerHTML={{ __html: parsedBody }}
            />
          )}
        </>
      )}
    </Main>
  );
};

export default Blog;

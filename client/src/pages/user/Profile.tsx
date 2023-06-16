import { styled } from '../../stitches.config';
import NotFound from '../NotFound';
import { A as NavLink } from '../../components/common/elements';
import ProfileAbout from '../../components/layout/profile/ProfileAbout';
import BlogItem from '../../components/layout/BlogItem';
import { useUser } from '../../context/useUser';
import { getUserByUsername } from '../../utils/userApi';
import { getBlogsByUserId } from '../../utils/blogsApi';
import { convertImageDataToBlobUrl } from '../../utils/convertImage';
import IUser from '../../types/IUser';
import { IBlogData } from '../../types/IBlog';

import { useEffect, useState } from 'react';
import { useParams, Link, Route, Routes, useMatch } from 'react-router-dom';

// banner
const Banner = styled('div', {
  width: '100%',
  padding: '1.5rem max(calc((100% - $sizes$contentWidth) / 2), 2rem)',
  backgroundColor: 'Black',
  color: 'White',

  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  rowGap: '1rem',

  '@tablet': {
    paddingTop: '2.5rem',
    paddingBottom: '2.5rem',
  },
});

const Icon = styled('img', {
  marginRight: '1rem',
  width: '5rem',
  aspectRatio: '1/1',
  borderRadius: '50%',
  objectFit: 'cover',
  userSelect: 'none',

  '@tablet': {
    marginRight: '1.5rem',
    width: '7.5rem',
  },

  '@desktop': {
    marginRight: '2rem',
    width: '12.5rem',
  },

  variants: {
    blank: {
      true: {
        backgroundColor: 'Gray',
      },
    },
  },
});

const BannerInfoContainer = styled('div');

const BannerTitle = styled('h1', {
  fontSize: '$m-3',
  fontWeight: '700',

  '@tablet': {
    fontSize: '$4',
  },

  '@desktop': {
    fontSize: '$3',
  },
});

const BannerDesc = styled('p', {
  fontSize: '$m-5',

  '@tablet': {
    fontSize: '$6',
  },

  '@desktop': {
    fontSize: '$5',
  },
});

// main
const Main = styled('main', {
  margin: '0 auto',
  paddingBottom: '3rem',
  width: '80%',
  maxWidth: '$contentWidthS',
});

const Nav = styled('div', {
  margin: '1.5rem auto',
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',

  '@desktop': {
    margin: '2rem auto',
  },
});

const LinkCSS = {
  height: 'auto',
  padding: '0.35rem',
  fontSize: '$m-5',

  '@tablet': {
    fontSize: '$6',
  },

  '@desktop': {
    fontSize: '$5',
  },
};

const Profile = () => {
  const { username } = useParams();
  const matchIndex = useMatch(`/${username}`);
  const matchAbout = useMatch(`/${username}/about`);
  const matchBlogs = useMatch(`/${username}/blogs`);

  const { user, userIcon } = useUser();
  const [userData, setUserData] = useState<IUser | null>(null);
  const [blogs, setBlogs] = useState<IBlogData[]>([]);
  const [iconBlobUrl, setIconBlobUrl] = useState<string>('');

  const [userNotFound, setUserNotFound] = useState<boolean>(false);

  useEffect(() => {
    if (!username) return;

    if (user?.username === username) {
      setUserData(user);
      setIconBlobUrl(userIcon);
      setUserNotFound(false);
      return;
    }

    getUserByUsername(username)
      .then((user) => {
        if (user && !user.error) {
          setUserData(user as IUser);

          if (user.icon?.mime && user.icon?.image) {
            setIconBlobUrl(
              convertImageDataToBlobUrl(user.icon.mime, user.icon.image)
            );
          }

          setUserNotFound(false);
        } else {
          setUserNotFound(true);
        }
      })
      .catch((err) => console.error(err));
  }, [username, user, userIcon]);

  useEffect(() => {
    if (!userData) return;

    getBlogsByUserId(userData?._id)
      .then((blogs) => {
        if (blogs?.error) throw new Error(blogs.error.message);

        if (blogs) {
          setBlogs(blogs as IBlogData[]);
        } else {
          throw new Error('No blogs found');
        }
      })
      .catch((err) => console.error(err));
  }, [userData]);

  if (userNotFound) {
    return <NotFound />;
  }

  return (
    <>
      <Banner>
        {iconBlobUrl ? (
          <Icon src={iconBlobUrl} alt="profile-icon" />
        ) : (
          <Icon blank />
        )}

        <BannerInfoContainer>
          {userData?.firstName || userData?.lastName ? (
            <>
              <BannerTitle>
                {userData?.firstName} {userData?.lastName}
              </BannerTitle>
              <BannerDesc>@{userData?.username}</BannerDesc>
            </>
          ) : (
            <>
              <BannerTitle>{userData?.username}</BannerTitle>
            </>
          )}
        </BannerInfoContainer>
      </Banner>

      <Main>
        <Nav>
          <NavLink
            className={matchAbout || matchIndex ? 'active' : ''}
            css={LinkCSS}
            color="none"
            as={Link}
            to="about"
          >
            About
          </NavLink>
          <NavLink
            className={matchBlogs ? 'active' : ''}
            color="none"
            as={Link}
            to="blogs"
            css={LinkCSS}
          >
            Blogs
          </NavLink>
        </Nav>

        {userData && (
          <Routes>
            {['', '/about'].map((path) => (
              <Route
                path={path}
                key={crypto.randomUUID()}
                element={
                  <ProfileAbout
                    contact={userData.contact}
                    location={userData.location}
                    email={userData.email}
                  />
                }
              />
            ))}

            <Route
              path="/blogs"
              element={blogs.map((blog) => (
                <BlogItem
                  key={crypto.randomUUID()}
                  _id={blog._id}
                  username={userData.username}
                  title={blog.title}
                  snippet={blog.snippet}
                  createdAt={blog.createdAt}
                />
              ))}
            />
          </Routes>
        )}
      </Main>
    </>
  );
};

export default Profile;

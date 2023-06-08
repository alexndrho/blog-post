import { useAuth } from './context/useAuth';
import { useUser } from './context/useUser';
import Loading from './pages/Loading';
import Navigation from './components/layout/Navigation';
import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';
import Profile from './pages/user/Profile';
import SettingsUser from './pages/user/SettingsProfile';
import AllBlogs from './pages/blog/AllBlogs';
import Blog from './pages/blog/Blog';
import CreateBlog from './pages/blog/CreateBlog';
import NotFound from './pages/NotFound';
import { useGlobalCss } from './stitches.config';
import { getUser, getUserIcon } from './utils/userApi';
import IUser, { IVerifyUserResponse } from './types/IUser';

import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import '@fontsource/raleway/400.css';
import '@fontsource/raleway/500.css';
import '@fontsource/raleway/600.css';
import '@fontsource/raleway/700.css';
import '@fontsource/raleway/800.css';

const App = () => {
  useGlobalCss();

  const { setLoggedIn, setLoggedOut } = useAuth();
  const { user, setUser, setUserIcon } = useUser();
  const [isLoading, setIsLoading] = useState(true);

  const delayLoadingDone = (duration: number) => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000 - duration);
  };

  useEffect(() => {
    const isUserAuth = async () => {
      setIsLoading(true);
      const currentTime = new Date().getTime();

      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL_SERVER}/isUserAuth`,
          {
            headers: {
              'x-access-token': localStorage.getItem('token') as string,
            },
          }
        );

        const responseData: IVerifyUserResponse = await response.json();
        const responseTime = new Date().getTime();

        if (responseData.error) throw new Error(responseData.error.message);

        if (responseData.token) {
          localStorage.setItem('token', responseData.token);
          setLoggedIn();

          if (responseTime - currentTime < 1000) {
            delayLoadingDone(responseTime - currentTime);
          } else {
            delayLoadingDone(responseTime - currentTime);
          }
        } else {
          setLoggedOut();
          delayLoadingDone(responseTime - currentTime);
        }
      } catch (err) {
        setLoggedOut();
        delayLoadingDone(0);
        console.error(err);
      }
    };

    isUserAuth();
  }, [setLoggedIn, setLoggedOut]);

  useEffect(() => {
    getUser()
      .then((data) => {
        if (data?.error) throw new Error(data.error.message);

        if (data) {
          setUser(data as IUser);
        } else {
          setUser(null);
          throw new Error('User not found');
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [setUser]);

  useEffect(() => {
    if (user) return;

    getUserIcon()
      .then((icon) => {
        if (icon?.error) throw new Error(icon.error.message);

        if (icon?.mime && icon?.image?.data) {
          setUserIcon(
            `data:${icon.mime};base64,` +
              btoa(String.fromCharCode(...new Uint8Array(icon.image.data)))
          );
        } else {
          setUserIcon('');
          throw new Error('User icon not found');
        }
      })
      .catch((err) => console.error(err));
  }, [user, setUserIcon]);

  return (
    <>
      {isLoading && <Loading />}

      <Navigation />
      <Routes>
        <Route path="/" element={<AllBlogs />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        <Route path="/blogs">
          <Route index element={<AllBlogs />} />
          <Route path="create" element={<CreateBlog />} />
          <Route path=":id" element={<Blog />} />
        </Route>

        <Route path="/settings">
          {['', 'profile'].map((path) => (
            <Route
              key={crypto.randomUUID()}
              path={path}
              element={<SettingsUser />}
            />
          ))}
        </Route>

        <Route path="/:username/*" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;

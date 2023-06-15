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
import { getUser } from './utils/userApi';
import { convertImageDataToBlobUrl } from './utils/convertImage';
import IUser from './types/IUser';

import { useCallback, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import '@fontsource/raleway/400.css';
import '@fontsource/raleway/500.css';
import '@fontsource/raleway/600.css';
import '@fontsource/raleway/700.css';
import '@fontsource/raleway/800.css';
import { isUserAuth } from './utils/authApi';

const App = () => {
  useGlobalCss();

  const { isLoggedIn, setLoggedIn, setLoggedOut } = useAuth();
  const { setUser, setUserIcon } = useUser();
  const [isLoading, setIsLoading] = useState(true);

  const delayLoadingDone = (duration: number) => {
    if (duration > 1000) {
      setIsLoading(false);
      return;
    }

    setTimeout(() => {
      setIsLoading(false);
    }, 1000 - duration);
  };

  const updateUser = useCallback(async () => {
    if (!isLoggedIn) {
      delayLoadingDone(0);
      return;
    }

    setIsLoading(true);
    const startTime = Date.now();

    await getUser()
      .then((data) => {
        if (data?.error) throw new Error(data.error.message);

        if (data) {
          setUser(data as IUser);

          if (data.icon?.mime && data.icon?.image) {
            setUserIcon(
              convertImageDataToBlobUrl(data.icon.mime, data.icon.image)
            );
          }
        } else {
          setUser(null);
          throw new Error('User not found');
        }
      })
      .catch((err) => {
        console.error(err);
      });

    delayLoadingDone(Date.now() - startTime);
  }, [isLoggedIn, setUser, setUserIcon]);

  useEffect(() => {
    isUserAuth(setLoggedIn, setLoggedOut).catch((err) => console.error(err));
  }, [setLoggedIn, setLoggedOut]);

  useEffect(() => {
    updateUser();
  }, [isLoggedIn, updateUser]);

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

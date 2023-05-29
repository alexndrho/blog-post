import { useAuth } from './context/useAuth';
import Loading from './pages/Loading';
import Navigation from './components/Navigation';
import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';
import SettingsUser from './pages/user/SettingsProfile';
import AllBlogs from './pages/blog/AllBlogs';
import Blog from './pages/blog/Blog';
import CreateBlog from './pages/blog/CreateBlog';
import NotFound from './pages/NotFound';
import { useGlobalCss } from './stitches.config';
import { IUserAuth } from './types/authentication';

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
  const [isLoading, setIsLoading] = useState(true);

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

        const responseData: IUserAuth = await response.json();
        if (responseData.isloggedIn) {
          localStorage.setItem('token', responseData.token);
          setLoggedIn();
          const responseTime = new Date().getTime();

          if (responseTime - currentTime < 1000) {
            setTimeout(() => {
              setIsLoading(false);
            }, 1000 - (responseTime - currentTime));
          } else {
            setIsLoading(false);
          }
        } else {
          setLoggedOut();
          setIsLoading(false);
        }
      } catch (err) {
        setLoggedOut();
        setIsLoading(false);
        console.error(err);
      }
    };

    isUserAuth();
  }, [setLoggedIn, setLoggedOut]);

  return (
    <>
      {isLoading && <Loading />}

      <Navigation />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        <Route path="/settings" element={<SettingsUser />}>
          <Route path="profile" element={<SettingsUser />} />
        </Route>

        <Route path="/blogs">
          <Route index element={<AllBlogs />} />
          <Route path="create" element={<CreateBlog />} />
          <Route path=":id" element={<Blog />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;

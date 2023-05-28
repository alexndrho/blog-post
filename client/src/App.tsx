import { useAuth } from './context/useAuth';
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

import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import '@fontsource/raleway/400.css';
import '@fontsource/raleway/500.css';
import '@fontsource/raleway/600.css';
import '@fontsource/raleway/700.css';
import '@fontsource/raleway/800.css';

const App = () => {
  useGlobalCss();

  const { setLoggedIn, setLoggedOut } = useAuth();

  useEffect(() => {
    const isUserAuth = async () => {
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
        }
      } catch (err) {
        setLoggedOut();
        console.error(err);
      }
    };

    isUserAuth();
  }, [setLoggedIn, setLoggedOut]);

  return (
    <>
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

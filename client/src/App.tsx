import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';
import Navigation from './components/Navigation';
import AllBlogs from './pages/blog/AllBlogs';
import Blog from './pages/blog/Blog';
import CreateBlog from './pages/blog/CreateBlog';
import NotFound from './pages/NotFound';
import { useGlobalCss } from './stitches.config';

import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import '@fontsource/raleway/400.css';
import '@fontsource/raleway/500.css';
import '@fontsource/raleway/600.css';
import '@fontsource/raleway/800.css';

const App = () => {
  useGlobalCss();

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

        const responseData = await response.json();
        if (responseData.isloggedIn) {
          console.log('success');
        } else {
          console.log('fail');
        }
      } catch (err) {
        console.error(err);
      }
    };

    isUserAuth();
  }, []);

  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

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

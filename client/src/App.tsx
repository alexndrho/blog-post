import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Navigation from './components/Navigation';
import AllBlogs from './components/blog/AllBlogs';
import Blog from './components/blog/Blog';
import CreateBlog from './components/blog/CreateBlog';
import NotFound from './components/NotFound';
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
        <Route path="/register" element={<Register />} />

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

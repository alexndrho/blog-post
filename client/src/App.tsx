/* eslint-disable @typescript-eslint/no-explicit-any */
import Navigation from './components/Navigation';
import NotFound from './components/NotFound';
import { getBlogs } from './API';
import { useGlobalCss } from './stitches.config';

import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import '@fontsource/raleway/400.css';
import '@fontsource/raleway/800.css';

const App = () => {
  const [blogs, setBlogs] = useState<IBlog[]>([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  useGlobalCss();

  const fetchBlogs = (): void => {
    getBlogs()
      .then(({ data: { blogs } }: IBlog[] | any) => setBlogs(blogs))
      .catch((err: Error) => console.log(err));
  };

  return (
    <>
      <Navigation />
      <Routes>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;

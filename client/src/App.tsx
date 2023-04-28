/* eslint-disable @typescript-eslint/no-explicit-any */
import { getBlogs } from './API';
import { useGlobalCss } from './stitches.config';

import React, { useEffect, useState } from 'react';

const App: React.FC = () => {
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

  return <></>;
};

export default App;

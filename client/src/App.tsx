import Navigation from './components/Navigation';
import AllBlogs from './components/AllBlogs';
import Blog from './components/Blog';
import CreateBlog from './components/CreateBlog';
import NotFound from './components/NotFound';
import { useGlobalCss } from './stitches.config';

import { Routes, Route } from 'react-router-dom';
import '@fontsource/raleway/400.css';
import '@fontsource/raleway/500.css';
import '@fontsource/raleway/600.css';
import '@fontsource/raleway/800.css';

const App = () => {
  useGlobalCss();

  return (
    <>
      <Navigation />
      <Routes>
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

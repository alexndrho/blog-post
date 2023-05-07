import Navigation from './components/Navigation';
import NotFound from './components/NotFound';
import { useGlobalCss } from './stitches.config';

import { Routes, Route } from 'react-router-dom';
import '@fontsource/raleway/400.css';
import '@fontsource/raleway/800.css';

const App = () => {
  useGlobalCss();

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

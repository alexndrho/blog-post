import { createStitches } from '@stitches/react';

const stitches = createStitches({
  theme: {
    fonts: {
      default: 'Raleway, sans-serif',
    },
    fontSizes: {
      xs: '1rem',
      s: '1.25rem',
      m: '2rem',
      l: '3rem',
      xl: '3.5rem',
    },
  },
  media: {
    tablet: '(min-width: 500px)',
    desktop: '(min-width: 1000px)',
  },
});

const useGlobalCss = stitches.globalCss({
  '*': {
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
  },
  '*::before, *::after': {
    boxSizing: 'border-box',
  },
  'html, body, #root': {
    width: '100%',
    minHeight: '100%',
    padding: 0,
  },
  body: {
    fontFamily: '$default',
  },
  button: {
    cursor: 'pointer',
  },
  '.stop-transition': {
    animation: 'none !important',
    transition: 'none !important',
  },
});

export default stitches;
export { useGlobalCss };

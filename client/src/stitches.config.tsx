import { createStitches } from '@stitches/react';

const stitches = createStitches({
  theme: {
    colors: {
      lightBlack: '#4C4C4C',
      lightGray: '#CBCBCB',
      danger: '#CC0000',
    },
    fonts: {
      default: 'Raleway, sans-serif',
    },
    fontSizes: {
      xs: '1rem',
      s: '1.25rem',
      m: '2rem',
      l: '2.5rem',
      xl: '3.5rem',
      title: '2.5rem',
    },
    sizes: {
      contentWidth: '1280px',
      contentWidthS: '1000px',
      formWidth: '800px',
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
    height: '100%',
    minHeight: '100% !important',
    padding: 0,
  },
  body: {
    fontFamily: '$default',
  },
  '#root': {
    display: 'flex',
    flexDirection: 'column',
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

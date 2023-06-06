import { createStitches } from '@stitches/react';

const { styled, globalCss, css } = createStitches({
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
      // xxs: '0.75rem',
      // xs: '1rem',
      // s: '1.25rem',
      // m: '2rem',
      // l: '2.5rem',
      // xl: '3.5rem',

      title: '2.5rem',

      // desktop
      1: '3.75rem',
      2: '3rem',
      3: '2.25rem',
      4: '1.5rem',
      5: '1.125rem',
      6: '1rem',
      7: '0.75rem',

      // mobile
      'm-1': '2.5rem',
      'm-2': '2rem',
      'm-3': '1.5rem',
      'm-4': '1.25rem',
      'm-5': '1rem',
      'm-6': '0.75rem',
    },
    sizes: {
      contentWidth: '1280px',
      contentWidthS: '1000px',
      formWidth: '800px',
    },
    space: {
      mobPadding: '1.5rem',
    },
  },
  media: {
    tablet: '(min-width: 500px)',
    desktop: '(min-width: 1000px)',
  },
});

const useGlobalCss = globalCss({
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
  img: {
    pointerEvents: 'none',
  },
});

export { styled, useGlobalCss, css };

import { createStitches } from '@stitches/react';

const stitches = createStitches({});

const useGlobalCss = stitches.globalCss({
  '*': {
    margin: 0,
    boxSizing: 'border-box',
  },
  '*::before': {
    boxSizing: 'border-box',
  },
  '*::after': {
    boxSizing: 'border-box',
  },
  'html, body, #root': {
    width: '100%',
    height: '100%',
    padding: 0,
  },
  '#root': {
    display: 'flex',
    justifyContent: 'center',
  },
  button: {
    cursor: 'pointer',
  },
});

export default stitches;
export { useGlobalCss };

import { styled } from '../../stitches.config';

export const UsernameLink = styled('span', {
  color: 'inherit',
  textDecoration: 'underline',

  '@desktop': {
    textDecoration: 'none',

    '&:hover': {
      textDecoration: 'underline',
    },
  },
});

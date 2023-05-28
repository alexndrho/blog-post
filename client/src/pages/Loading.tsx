import stitches from '../stitches.config';

const { styled } = stitches;

const LoadingContainer = styled('main', {
  position: 'absolute',
  zIndex: 100,

  width: '100vw',
  height: '100vh',
  backgroundColor: 'White',

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const Logo = styled('h1', {
  fontSize: '6rem',

  '@tablet': {
    fontSize: '8rem',
  },

  '@desktop': {
    fontSize: '10rem',
  },
});

const Loading = () => {
  return (
    <LoadingContainer>
      <Logo>Blog</Logo>
    </LoadingContainer>
  );
};

export default Loading;

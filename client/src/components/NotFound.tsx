import stitches from '../stitches.config';

const { styled } = stitches;

const Main = styled('main', {
  flexGrow: 1,
  width: '100%',
  height: 'auto',
  padding: '5rem',
});

const Title = styled('h2', {
  fontSize: '8rem',
  textAlign: 'center',

  '@tablet': {
    fontSize: '12rem',
    textAlign: 'left',
  },
  '@desktop': {
    fontSize: '16rem',
    textAlign: 'left',
  },
});

const P = styled('p', {
  fontSize: '$m',
  textAlign: 'center',
  '@tablet': {
    textAlign: 'left',
  },
  '@desktop': {
    fontSize: '$l',
    textAlign: 'left',
  },
});

const NotFound = () => {
  return (
    <Main>
      <Title>404</Title>
      <P>THE PAGE YOU ARE LOOKING FOR DOES NOT EXIST</P>
    </Main>
  );
};

export default NotFound;

import stitches from '../stitches.config';

const { styled } = stitches;

const Main = styled('main', {
  margin: '0 auto',
  padding: '0 $mobPadding 0 $mobPadding',
  height: '80%',
  width: '100%',
  maxWidth: '$contentWidth',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',

  '@tablet': {
    alignItems: 'flex-start',
  },
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

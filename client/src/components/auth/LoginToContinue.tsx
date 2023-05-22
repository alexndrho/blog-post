import stitches from '../../stitches.config';
import { Title } from '../stitches/form';
import { A } from '../stitches/elements';
import { Link } from 'react-router-dom';

const { styled } = stitches;

const Main = styled('main', {
  margin: '0 auto',
  minHeight: '80%',
  width: '$contentWidth',
  padding: '0 $mobPadding',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
});

const LoginToContinue = () => {
  return (
    <Main>
      <Title css={{ marginBottom: '2rem' }}>Log in to continue</Title>
      <A css={{ width: '7rem' }} mb1 as={Link} to="/signup">
        Sign up
      </A>
      <A css={{ width: '7rem' }} color={'none'} mb1 as={Link} to="/login">
        Log in
      </A>
    </Main>
  );
};

export default LoginToContinue;

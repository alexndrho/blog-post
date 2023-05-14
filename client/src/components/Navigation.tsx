import stitches from '../stitches.config';
import { A as AStyled } from './stitches/elements';

import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const { styled } = stitches;

const Header = styled('header', {
  paddingTop: '1rem',
  paddingBottom: '1rem',
});

const Div = styled('div', {
  margin: 'auto',
  padding: '0 1.5rem 0 1.5rem',
  maxWidth: '$contentWidth',
  display: 'flex',
  alignItems: 'center',
});

const TitleWrapper = styled('div', {
  textDecoration: 'none',
  color: 'inherit',

  '@desktop': {
    marginRight: '2rem',
  },
});

const Title = styled('h1', {
  position: 'relative',
  zIndex: 99,
  fontSize: '$l',
  userSelect: 'none',
  fontWeight: 'bolder',
});

const Menu = styled('div', {
  flex: '1',
  display: 'flex',
  justifyContent: 'space-between',
});

const Nav = styled('nav', {
  position: 'fixed',
  top: 0,
  left: '100%',
  zIndex: 98,
  padding: '5rem',
  display: 'block',
  width: '100vw',
  minHeight: '100vh',
  backgroundColor: 'White',
  transition: 'left 0.5s ease',

  '@desktop': {
    height: 'auto',
    minHeight: 'auto',
    width: 'auto',
    minWidth: 'auto',
    padding: 0,
    display: 'flex',
    position: 'static',
    backgroundColor: 'none',
  },

  '&.active': {
    left: 0,
  },
});

const A = styled('a', {
  marginTop: '1rem',
  textDecoration: 'none',
  fontSize: '$xs',
  fontWeight: '600',
  color: 'Black',
  padding: '0.75rem 1rem',
  display: 'block',
  textAlign: 'center',

  '@desktop': {
    marginTop: '0rem',
    display: 'block',
    padding: '1rem',
  },
});

const AuthWrapperMobile = styled('div', {
  flex: 1,
  display: 'flex',
  alignItems: 'center',

  '@desktop': {
    display: 'none',
  },
});

const AuthWrapperDesktop = styled('div', {
  display: 'none',

  '@desktop': {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

const HambgMenuWrapper = styled('div', {
  flex: 1,

  '@desktop': {
    display: 'none',
  },
});

const HambgMenu = styled('a', {
  position: 'relative',
  zIndex: 99,
  marginLeft: 'auto',
  width: '2rem',
  height: '1.5rem',
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
});

const Bar = styled('span', {
  width: '100%',
  height: '0.25rem',
  backgroundColor: 'Black',
  borderRadius: '1rem',
});

const Navigation = () => {
  const linksRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    window.addEventListener('resize', () => {
      linksRef.current?.classList.add('stop-transition');
      setTimeout(() => {
        linksRef.current?.classList.remove('stop-transition');
      }, 2000);
    });
  }, []);

  //display nav links for mobile view
  const displayNav = () => {
    linksRef.current?.classList.toggle('active');
  };

  return (
    <Header>
      <Div>
        <AuthWrapperMobile>
          <AStyled size="btn_sm" color="outline" as={Link} to="/signup">
            Sign up
          </AStyled>
        </AuthWrapperMobile>

        <TitleWrapper as={Link} to="/">
          <Title>BLOG</Title>
        </TitleWrapper>

        <Menu>
          <HambgMenuWrapper>
            <HambgMenu onClick={displayNav}>
              <Bar />
              <Bar />
              <Bar />
            </HambgMenu>
          </HambgMenuWrapper>

          <Nav ref={linksRef}>
            <A as={Link} to="/" onClick={displayNav}>
              Home
            </A>
            <A as={Link} to="/blogs" onClick={displayNav}>
              All blogs
            </A>
            <A as={Link} to="/blogs/create" onClick={displayNav}>
              Create blog
            </A>
          </Nav>

          <AuthWrapperDesktop>
            <AStyled size="btn_sm" color="none" mr1 as={Link} to="/login">
              Log in
            </AStyled>
            <AStyled size="btn_sm" color="outline" as={Link} to="/signup">
              Sign up
            </AStyled>
          </AuthWrapperDesktop>
        </Menu>
      </Div>
    </Header>
  );
};

export default Navigation;

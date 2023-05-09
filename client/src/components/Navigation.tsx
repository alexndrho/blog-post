import stitches from '../stitches.config';

import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const { styled } = stitches;

const Header = styled('header', {
  width: '100%',
  minHeight: '$navHeight',
  padding: '1em 2em',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexDirection: 'column',

  '@tablet': {
    flexDirection: 'row',
  },
});

const TitleWrapper = styled('div', {
  textDecoration: 'none',
  color: 'inherit',
});

const Title = styled('h1', {
  position: 'relative',
  zIndex: 99,
  fontSize: '$l',
  userSelect: 'none',
  fontWeight: 'bolder',
});
const Nav = styled('nav', {
  position: 'fixed',
  top: 0,
  left: '100%',
  zIndex: 98,
  padding: '$sizes$navHeight',
  display: 'block',
  width: '100vw',
  minWidth: '100vw',
  minHeight: '100vh',
  backgroundColor: 'White',
  transition: 'left 0.5s ease',

  '@tablet': {
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
  fontSize: '$s',
  color: 'Black',
  padding: '0.75rem 1rem',
  display: 'block',
  textAlign: 'center',

  '@tablet': {
    marginTop: '0rem',
    display: 'block',
    padding: '1rem',
  },
});

const HambgMenu = styled('a', {
  position: 'absolute',
  zIndex: 99,
  top: '2rem',
  right: '3rem',
  width: '2rem',
  height: '1.5rem',
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',

  '@tablet': {
    display: 'none',
  },
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
      <TitleWrapper as={Link} to="/">
        <Title>BLOG</Title>
      </TitleWrapper>
      <HambgMenu onClick={displayNav}>
        <Bar />
        <Bar />
        <Bar />
      </HambgMenu>
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
    </Header>
  );
};

export default Navigation;

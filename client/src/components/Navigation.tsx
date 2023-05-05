import stitches from '../stitches.config';

import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const { styled } = stitches;

const Nav = styled('nav', {
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
  fontSize: '$l',
  userSelect: 'none',
  fontWeight: 'bolder',
});

const Links = styled('ul', {
  maxHeight: '0px',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  height: 'auto',
  transition: 'all 0.5s ease',

  '@tablet': {
    maxHeight: '500px',
    flexDirection: 'row',
  },

  '&.active': {
    maxHeight: '500px',
  },
});

const Li = styled('li', { listStyle: 'none', textAlign: 'center' });

const A = styled('a', {
  textDecoration: 'none',
  color: 'Black',
  padding: '0.75rem 1rem',
  display: 'block',
  // display: 'none',

  '@tablet': {
    display: 'block',
    padding: '1rem',
  },
});

const HambgMenu = styled('a', {
  position: 'absolute',
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
    <Nav>
      <TitleWrapper as={Link} to="/">
        <Title>BLOG</Title>
      </TitleWrapper>
      <HambgMenu onClick={displayNav}>
        <Bar />
        <Bar />
        <Bar />
      </HambgMenu>
      <Links ref={linksRef}>
        <Li>
          <A as={Link} to="/">
            Home
          </A>
        </Li>
        <Li>
          <A as={Link} to="/blog/create">
            Create blog
          </A>
        </Li>
      </Links>
    </Nav>
  );
};

export default Navigation;

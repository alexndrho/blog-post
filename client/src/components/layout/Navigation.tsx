import { styled } from '../../stitches.config';
import { A as AStyled } from '../common/elements';
import { useAuth } from '../../context/useAuth';
import { useUser } from '../../context/useUser';

import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const Header = styled('header', {
  backgroundColor: 'White',
  paddingTop: '1rem',
  paddingBottom: '1rem',
});

const Div = styled('div', {
  margin: 'auto',
  padding: '0 $mobPadding 0 $mobPadding',
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
  fontSize: '$3',
  userSelect: 'none',
  fontWeight: 'bolder',
});

const Menu = styled('div', {
  flex: '1',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
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
  fontSize: '$5',
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

// profile icon
const IconContainer = styled('div', {
  position: 'relative',
  cursor: 'pointer',
});

const Icon = styled('img', {
  height: '$fontSizes$3',
  aspectRatio: 1,
  borderRadius: '50%',
  objectFit: 'cover',
  userSelect: 'none',

  variants: {
    blank: {
      true: {
        backgroundColor: 'Gray',
      },
    },
  },
});

const ArrowContainer = styled('div', {
  position: 'absolute',
  bottom: 0,
  right: 0,

  backgroundColor: 'Black',
  width: '$fontSizes$5',
  aspectRatio: 1,
  borderRadius: '50%',

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const Arrow = styled('span', {
  fontSize: '0.65rem',
  transform: 'rotate(90deg)',
  transition: 'transform 0.25s',

  '&::before': {
    content: '\\276F',
    color: 'White',
  },

  '&.active': {
    transform: 'rotate(-90deg)',
  },
});

const ProfileModal = styled('dialog', {
  inset: 'calc(100% + 0.5rem) 0 auto auto',

  borderRadius: '0.5rem',
  border: 'none',
  backgroundColor: 'Black',
  overflow: 'hidden',
});

const ProfileModalLink = styled('a', {
  display: 'block',
  padding: '0.75rem 1rem',
  textDecoration: 'none',
  color: 'White',
  fontSize: '$5',
  fontWeight: '600',
  cursor: 'pointer',
  userSelect: 'none',
  outline: 'none',

  '&:hover': {
    backgroundColor: 'Gray',
  },
});

const tabletCss = {
  '@desktop': {
    display: 'none',
  },
};

const Navigation = () => {
  const { isLoggedIn, setLoggedOut } = useAuth();
  const { user, userIcon } = useUser();
  const linksRef = useRef<HTMLUListElement>(null);

  const profileModalRef = useRef<HTMLDialogElement>(null);
  const arrowRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    window.addEventListener('resize', () => {
      linksRef.current?.classList.add('stop-transition');
      setTimeout(() => {
        linksRef.current?.classList.remove('stop-transition');
      }, 2000);
    });
  }, []);

  const logOut = () => {
    localStorage.removeItem('token');
    setLoggedOut();
  };

  const toggleProfileMenu = () => {
    arrowRef.current?.classList.toggle('active');

    profileModalRef.current?.open
      ? profileModalRef.current?.close()
      : profileModalRef.current?.show();
  };

  //display nav links for mobile view
  const toggleDisplayNav = () => {
    linksRef.current?.classList.toggle('active');
  };

  return (
    <Header>
      <Div>
        <TitleWrapper as={Link} to="/">
          <Title>BLOG</Title>
        </TitleWrapper>

        <Menu>
          <HambgMenuWrapper>
            <HambgMenu onClick={toggleDisplayNav}>
              <Bar />
              <Bar />
              <Bar />
            </HambgMenu>
          </HambgMenuWrapper>

          <Nav ref={linksRef}>
            {isLoggedIn && user?.username && (
              <A
                as={Link}
                to={`/${user.username}`}
                onClick={toggleDisplayNav}
                css={tabletCss}
              >
                Profile
              </A>
            )}

            <A as={Link} to="/" onClick={toggleDisplayNav}>
              Home
            </A>
            <A as={Link} to="/blogs/create" onClick={toggleDisplayNav}>
              Create blog
            </A>

            {isLoggedIn ? (
              <>
                <A
                  as={Link}
                  to="/settings/profile"
                  onClick={toggleDisplayNav}
                  css={tabletCss}
                >
                  Settings
                </A>

                <A
                  as={Link}
                  to="/"
                  onClick={() => {
                    logOut();
                    toggleDisplayNav();
                  }}
                  css={tabletCss}
                >
                  Log out
                </A>
              </>
            ) : (
              <>
                <A
                  as={Link}
                  to="/signup"
                  onClick={toggleDisplayNav}
                  css={tabletCss}
                >
                  Sign up
                </A>
              </>
            )}
          </Nav>

          <AuthWrapperDesktop>
            {isLoggedIn ? (
              <IconContainer onClick={toggleProfileMenu}>
                {userIcon ? (
                  <Icon src={userIcon} alt="profile-icon" />
                ) : (
                  <Icon blank as="div" />
                )}

                <ArrowContainer>
                  <Arrow ref={arrowRef} />
                </ArrowContainer>

                <ProfileModal ref={profileModalRef}>
                  <ProfileModalLink as={Link} to={`/${user?.username}`}>
                    Profile
                  </ProfileModalLink>
                  <ProfileModalLink as={Link} to={`/settings/profile`}>
                    Settings
                  </ProfileModalLink>
                  <ProfileModalLink as={Link} to="/" onClick={logOut}>
                    Log out
                  </ProfileModalLink>
                </ProfileModal>
              </IconContainer>
            ) : (
              <>
                <AStyled size="btn_md" color="none" mr1 as={Link} to="/login">
                  Log in
                </AStyled>
                <AStyled size="btn_md" color="outline" as={Link} to="/signup">
                  Sign up
                </AStyled>
              </>
            )}
          </AuthWrapperDesktop>
        </Menu>
      </Div>
    </Header>
  );
};

export default Navigation;

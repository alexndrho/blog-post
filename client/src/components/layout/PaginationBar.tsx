import { styled } from '../../stitches.config';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  route: string;
  currentPage: number;
  totalPages: number;
}

const PaginationBarContainer = styled('div', {
  fontSize: '$m-5',
  marginTop: '2rem',
  height: '2.5em',
  alignSelf: 'center',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  '@tablet': {
    fontSize: '$5',
  },
});

const PageNumberContainer = styled('div', {
  margin: '0 1em',
  height: '100%',
  border: '0.125em solid black',
  borderRadius: '0.5em',
  overflow: 'hidden',
  display: 'flex',
});

const PageLink = styled('a', {
  height: '100%',
  width: '2.5em',
  color: 'Black',
  backgroundColor: 'White',
  fontWeight: '500',
  textDecoration: 'none',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  userSelect: 'none',
  userDrag: 'none',

  variants: {
    color: {
      filled: {
        backgroundColor: 'Black',
        color: 'White',
      },
    },

    radii: {
      normal: {
        borderRadius: '0.5em',
      },
    },
  },
});

const PaginationBar = ({ route, currentPage, totalPages }: Props) => {
  const mediaQuery = '(max-width: 999px)';
  const [isSmallScreen, setIsSmallScreen] = useState(
    window.matchMedia(mediaQuery).matches
  );

  // add event listener for window resize
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.matchMedia(mediaQuery).matches);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const renderPageNumbers = useCallback(() => {
    const pageNumbers = [];

    const rangeLength = isSmallScreen ? 5 : 10;

    const padding = Math.floor((rangeLength - 1) / 2);
    let rangeStart = Math.max(1, currentPage - padding);
    let rangeEnd = Math.min(totalPages, currentPage + padding);

    // adjust range if it's smaller than rangeLength
    if (rangeEnd - rangeStart < rangeLength - 1) {
      if (rangeStart === 1) {
        rangeEnd = Math.min(totalPages, rangeStart + rangeLength - 1);
      } else if (rangeEnd === totalPages) {
        rangeStart = Math.max(1, rangeEnd - rangeLength + 1);
      }
    }

    for (let i = rangeStart; i <= rangeEnd; i++) {
      const linkBorderCss =
        i === rangeEnd
          ? { borderRight: 'none' }
          : { borderRight: '0.125em solid black' };

      if (i === currentPage) {
        pageNumbers.push(
          <PageLink
            as={Link}
            to={route + `?page=${i}`}
            key={crypto.randomUUID()}
            color="filled"
            draggable="false"
            css={linkBorderCss}
          >
            {i}
          </PageLink>
        );
        continue;
      }

      pageNumbers.push(
        <PageLink
          as={Link}
          to={route + `?page=${i}`}
          key={crypto.randomUUID()}
          draggable="false"
          css={linkBorderCss}
        >
          {i}
        </PageLink>
      );
    }

    return pageNumbers;
  }, [route, currentPage, totalPages, isSmallScreen]);

  if (totalPages === 1) return null;

  return (
    <PaginationBarContainer>
      <PageLink
        as={Link}
        to={
          currentPage === 1
            ? route + `?page=${currentPage}`
            : route + `?page=${currentPage - 1}`
        }
        color="filled"
        draggable="false"
        radii="normal"
        css={{ height: '100%' }}
      >
        {'<'}
      </PageLink>

      <PageNumberContainer role="navigation">
        {renderPageNumbers()}
      </PageNumberContainer>

      <PageLink
        as={Link}
        to={
          currentPage === totalPages
            ? route + `?page=${currentPage}`
            : route + `?page=${currentPage + 1}`
        }
        color="filled"
        draggable="false"
        radii="normal"
        css={{ height: '100%' }}
      >
        {'>'}
      </PageLink>
    </PaginationBarContainer>
  );
};

export default PaginationBar;

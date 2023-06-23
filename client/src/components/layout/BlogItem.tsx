import { styled } from '../../stitches.config';
import { Link } from 'react-router-dom';
import { IBlogData } from '../../types/IBlog';

const TitleItem = styled('h2', {
  position: 'relative',
  display: 'inline-block',
  fontSize: '$m-3',
  marginBottom: '0.125rem',

  '@desktop': {
    fontSize: '$3',
  },

  '&::after': {
    content: '',
    position: 'absolute',
    left: 0,
    bottom: 0,

    width: 0,
    height: '0.2rem',
    backgroundColor: 'Black',
    transition: 'width 0.25s ease',
  },
});

const A = styled('a', {
  textDecoration: 'none',
  color: 'Black',

  marginBottom: '2rem',

  '@desktop': {
    marginBottom: '3rem',
  },

  [`&:hover ${TitleItem}::after`]: {
    width: '100%',
  },
});

const Info = styled('p', {
  marginBottom: '0.5rem',
  color: 'DimGray',
  fontSize: '$m-6',
  fontWeight: 500,

  '@desktop': {
    marginBottom: '0.75em',
    fontSize: '$6',
  },
});

const SnippetItem = styled('p', {
  textAlign: 'justify',
  fontSize: '$m-4',

  '@desktop': {
    fontSize: '$4',
  },
});

interface Props
  extends Pick<IBlogData, '_id' | 'title' | 'snippet' | 'createdAt'> {
  username: string;
}

const BlogItem = ({ _id, username, title, snippet, createdAt }: Props) => {
  return (
    <A as={Link} to={`${import.meta.env.VITE_BASE_URL_CLIENT}/blogs/${_id}`}>
      <>
        <TitleItem>{title}</TitleItem>
      </>
      <Info>
        {new Intl.DateTimeFormat('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        }).format(new Date(createdAt as string))}{' '}
        &#8226; {username}
      </Info>

      <SnippetItem>{snippet}</SnippetItem>
    </A>
  );
};

export default BlogItem;

import { styled } from '../../stitches.config';
import { Link } from 'react-router-dom';
import IBlog from '../../types/IBlog';

const Div = styled('div', {
  marginBottom: '2rem',

  '@desktop': {
    marginBottom: '3rem',
  },
});

const A = styled('a', {
  textDecoration: 'none',
  color: 'Black',
});

const Info = styled('p', {
  marginBottom: '0.25rem',
  color: 'DimGray',
  fontSize: '$xxs',
  fontWeight: 500,

  '@desktop': {
    fontSize: '$xs',
  },
});

const TitleItem = styled('h2', {
  fontSize: '$s',
  marginBottom: '0.5rem',

  '@desktop': {
    fontSize: '$m',
  },
});

const SnippetItem = styled('p', {
  textAlign: 'justify',
  fontSize: '$xs',

  '@desktop': {
    fontSize: '$s',
  },
});

interface Props extends Pick<IBlog, '_id' | 'title' | 'snippet' | 'createdAt'> {
  username: string;
}

const BlogItem = ({ _id, username, title, snippet, createdAt }: Props) => {
  return (
    <Div>
      <A as={Link} to={`${import.meta.env.VITE_BASE_URL_CLIENT}/blogs/${_id}`}>
        <Info>
          {new Intl.DateTimeFormat('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          }).format(new Date(createdAt as string))}{' '}
          &#8226; {username}
        </Info>
        <TitleItem>{title}</TitleItem>
        <SnippetItem>{snippet}</SnippetItem>
      </A>
    </Div>
  );
};

export default BlogItem;

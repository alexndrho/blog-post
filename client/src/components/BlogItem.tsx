import stitches from '../stitches.config';

const { styled } = stitches;

const Div = styled('div', {
  marginBottom: '3rem',

  '@desktop': {
    marginBottom: '4rem',
  },
});

const Link = styled('a', {
  textDecoration: 'none',
  color: 'Black',
});

const Title = styled('h3', {
  marginBottom: '0.75rem',
  fontSize: '$s',

  '@desktop': {
    marginBottom: '1rem',
    fontSize: '$m',
    fontWeight: '700',
  },
});

const Snippet = styled('p', {
  fontSize: '$xs',
  textAlign: 'justify',

  '@desktop': {
    fontSize: '$s',
  },
});

const BlogItem = ({
  _id,
  title,
  snippet,
}: Pick<IBlog, '_id' | 'title' | 'snippet'>) => {
  return (
    <Div>
      <Link href={`${import.meta.env.VITE_BASE_URL_CLIENT}/blogs/${_id}`}>
        <Title>{title}</Title>
        <Snippet>{snippet}</Snippet>
      </Link>
    </Div>
  );
};

export default BlogItem;

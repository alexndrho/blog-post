import stitches from '../stitches.config';

const { styled } = stitches;

const Div = styled('div', {
  marginBottom: '2rem',
});

const Link = styled('a', {
  textDecoration: 'none',
  color: 'Black',
});

const Title = styled('h3', {
  marginBottom: '0.25rem',
  fontSize: '$s',
});

const Snippet = styled('p', {
  fontSize: '$xs',
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

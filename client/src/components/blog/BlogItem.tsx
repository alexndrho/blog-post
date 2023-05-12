import stitches from '../../stitches.config';
import { TitleItem, SnippetItem } from '../stitches/blog';
import { Link } from 'react-router-dom';

const { styled } = stitches;

const Div = styled('div', {
  marginBottom: '3rem',

  '@desktop': {
    marginBottom: '4rem',
  },
});

const A = styled('a', {
  textDecoration: 'none',
  color: 'Black',
});

const BlogItem = ({
  _id,
  title,
  snippet,
}: Pick<IBlog, '_id' | 'title' | 'snippet'>) => {
  return (
    <Div>
      <A as={Link} to={`${import.meta.env.VITE_BASE_URL_CLIENT}/blogs/${_id}`}>
        <TitleItem mb0_75>{title}</TitleItem>
        <SnippetItem>{snippet}</SnippetItem>
      </A>
    </Div>
  );
};

export default BlogItem;

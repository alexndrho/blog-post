import { styled } from '../../../stitches.config';
import BlogItem from '../BlogItem';
import { IBlogData } from '../../../types/IBlog';

const Container = styled('section');

interface Props {
  username: string;
  blogs: IBlogData[];
}

const ProfileBlogs = ({ username, blogs }: Props) => {
  return (
    <Container>
      {blogs.map((blog) => (
        <BlogItem
          key={crypto.randomUUID()}
          _id={blog._id}
          username={username}
          title={blog.title}
          snippet={blog.snippet}
          createdAt={blog.createdAt}
        />
      ))}
    </Container>
  );
};

export default ProfileBlogs;

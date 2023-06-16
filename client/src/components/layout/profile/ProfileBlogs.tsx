import { styled } from '../../../stitches.config';
import BlogItem from '../BlogItem';
import PaginationBar from '../PaginationBar';
import IBlog from '../../../types/IBlog';

const Container = styled('section', {
  display: 'flex',
  flexDirection: 'column',
});

interface Props {
  username: string;
  blogs: IBlog;
  route: string;
  currentPage: number;
}

const ProfileBlogs = ({ username, blogs, route, currentPage }: Props) => {
  return (
    <Container>
      {blogs.dataBlogs.map((blog) => (
        <BlogItem
          key={crypto.randomUUID()}
          _id={blog._id}
          username={username}
          title={blog.title}
          snippet={blog.snippet}
          createdAt={blog.createdAt}
        />
      ))}

      <PaginationBar
        route={route}
        currentPage={currentPage}
        totalPages={blogs.totalPages}
      />
    </Container>
  );
};

export default ProfileBlogs;

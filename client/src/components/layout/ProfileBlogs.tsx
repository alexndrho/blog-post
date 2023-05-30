import stitches from '../../stitches.config';
import BlogItem from '../blog/BlogItem';
import { useEffect, useState } from 'react';

const { styled } = stitches;

const Container = styled('section');

interface Props {
  userId: string;
}

const ProfileBlogs = ({ userId }: Props) => {
  const [blogs, setBlogs] = useState<{ blogs: IBlog[] } | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL_SERVER}/blogs/user/${userId}`,
          {
            headers: {
              Accept: 'application/json',
            },
          }
        );

        const responseData = await response.json();

        setBlogs(responseData);
      } catch (err) {
        console.error(err);
      }
    };

    fetchBlogs();
  }, [userId]);

  return (
    <Container>
      {blogs?.blogs.map((blog) => (
        <BlogItem
          key={blog._id}
          _id={blog._id}
          username={blog.username}
          title={blog.title}
          snippet={blog.snippet}
          createdAt={blog.createdAt}
        />
      ))}
    </Container>
  );
};

export default ProfileBlogs;

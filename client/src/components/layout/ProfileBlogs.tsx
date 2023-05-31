import stitches from '../../stitches.config';
import BlogItem from '../blog/BlogItem';
import { useEffect, useState } from 'react';

const { styled } = stitches;

const Container = styled('section');

interface Props {
  userId: string;
}

const ProfileBlogs = ({ userId }: Props) => {
  const [blogs, setBlogs] = useState<IBlog[] | null>(null);
  const [userName, setUserName] = useState<string | null>(null);

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

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL_SERVER}/user/username/${userId}`,
          {
            headers: {
              Accept: 'application/json',
            },
          }
        );

        if (!response.ok) throw new Error('Could not fetch username');

        const responseData = await response.json();

        setUserName(responseData.username);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUserName();
  }, [userId]);

  return (
    <Container>
      {userName &&
        blogs?.map((blog) => (
          <BlogItem
            key={blog._id}
            _id={blog._id}
            username={userName}
            title={blog.title}
            snippet={blog.snippet}
            createdAt={blog.createdAt}
          />
        ))}
    </Container>
  );
};

export default ProfileBlogs;

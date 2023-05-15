interface IBlog {
  _id: string;
  userId: string;
  username: string;
  title: string;
  snippet: string;
  body: string;
  createdAt?: string;
  updatedAt?: string;
}

interface BlogProps {
  blog: Blog;
}

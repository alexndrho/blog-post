interface IBlog {
  _id: string;
  title: string;
  snippet: string;
  body: string;
  createdAt?: string;
  updatedAt?: string;
}

interface BlogProps {
  blog: Blog;
}

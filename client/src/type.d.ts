interface IBlog {
  _id: string;
  title: string;
  snippet: string;
  body: string;
  createdAt?: string;
  updatedAt?: string;
}

interface BlogProps {
  todo: Blog;
}

type ApiDataType = {
  message: string;
  status: string;
  blogs: IBlog[];
  blog?: IBlog;
};

interface IBlog {
  _id: string;
  userId: string;
  title: string;
  snippet: string;
  body: string;
  createdAt?: string;
  updatedAt?: string;
}

interface IGetBlogsResponse extends Partial<IBlog[]> {
  message?: string;
}

interface IGetBlogResponse extends Partial<IBlog> {
  message?: string;
}

interface IGetBlogsByUserIdResponse extends Partial<IBlog[]> {
  message?: string;
}

export default IBlog;
export type { IGetBlogsResponse, IGetBlogResponse, IGetBlogsByUserIdResponse };

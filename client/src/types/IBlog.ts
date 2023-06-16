import IError from './IError';

interface IBlogData {
  _id: string;
  userId: string;
  title: string;
  snippet: string;
  body: string;
  createdAt?: string;
  updatedAt?: string;
}

interface IBlog {
  dataBlogs: [IBlogData];
  totalPages: number;
}

interface IBlogsResponse extends Partial<IBlog>, Partial<IError> {}

interface IBlogResponse extends Partial<IBlogData>, Partial<IError> {}

interface IBlogCreateResponse extends Partial<IError> {
  id?: string;
}

export default IBlog;
export type { IBlogData, IBlogsResponse, IBlogResponse, IBlogCreateResponse };

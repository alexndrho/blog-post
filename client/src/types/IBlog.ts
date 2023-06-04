import IError from './IError';

interface IBlog {
  _id: string;
  userId: string;
  title: string;
  snippet: string;
  body: string;
  createdAt?: string;
  updatedAt?: string;
}

interface IBlogsResponse extends Partial<IBlog[]>, Partial<IError> {}

interface IBlogResponse extends Partial<IBlog>, Partial<IError> {}

interface IBlogCreateResponse extends Partial<IError> {
  id?: string;
}

export default IBlog;
export type { IBlogsResponse, IBlogResponse, IBlogCreateResponse };

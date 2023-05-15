import { Document } from 'mongoose';

interface DocumentResult<T> {
  _doc: T;
}

interface IBlog extends Document, DocumentResult<IBlog> {
  userId: string;
  username: string;
  title: string;
  snippet: string;
  body: string;
}

export default IBlog;

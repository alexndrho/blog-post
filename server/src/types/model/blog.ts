import { Document } from 'mongoose';

interface DocumentResult<T> {
  _doc: T;
}

interface IBlog extends Document, DocumentResult<IBlog> {
  _id: string;
  userId: string;
  title: string;
  snippet: string;
  body: string;
}

export default IBlog;

import { Document } from 'mongoose';

interface IBlog extends Document {
  title: string;
  snippet: string;
  body: string;
}

export default IBlog;

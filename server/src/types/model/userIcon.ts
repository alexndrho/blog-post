import { Document } from 'mongoose';

interface DocumentResult<T> {
  _doc: T;
}

interface IUserIcon extends Document, DocumentResult<IUserIcon> {
  userId: string;
  name: string;
  image: Buffer;
  mime: string;
}

export default IUserIcon;

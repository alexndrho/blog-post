import { Document } from 'mongoose';

interface DocumentResult<T> {
  _doc: T;
}

interface IUser extends Document, DocumentResult<IUser> {
  username: string;
  email: string;
  password: string;
}

export default IUser;

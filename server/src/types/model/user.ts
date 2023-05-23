import { Document } from 'mongoose';

interface DocumentResult<T> {
  _doc: T;
}

interface IUser extends Document, DocumentResult<IUser> {
  username: string;
  email: string;
  password: string;
  profileIconId: string;
  firstName: string;
  lastName: string;
  location: string;
  contact: string;
}

export default IUser;

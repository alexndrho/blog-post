import { Document } from 'mongoose';
import IUserIcon from './IUserIcon.js';

interface DocumentResult<T> {
  _doc: T;
}

interface IUser extends Document, DocumentResult<IUser> {
  icon: IUserIcon;
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

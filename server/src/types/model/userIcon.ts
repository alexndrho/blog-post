import { Document } from 'mongoose';

interface IUserIcon extends Document {
  userId: string;
  name: string;
  image: Buffer;
}

export default IUserIcon;

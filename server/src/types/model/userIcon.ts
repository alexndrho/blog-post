import { Document } from 'mongoose';

interface IUserIcon extends Document {
  userId: string;
  name: string;
  image: Buffer;
  mime: string;
}

export default IUserIcon;

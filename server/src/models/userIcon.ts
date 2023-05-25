import IUserIcon from '../types/model/userIcon.js';
import { Schema, model } from 'mongoose';

const userIconSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: Buffer,
    required: true,
  },
});

export default model<IUserIcon>('UserIcon', userIconSchema);

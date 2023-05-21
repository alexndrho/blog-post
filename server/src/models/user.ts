import { model, Schema } from 'mongoose';
import IUser from '../types/user';
import bcrypt from 'bcrypt';

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: [true, 'Username is required'],
      minLength: [6, 'Username must be at least 6 characters'],
      maxLength: [16, 'Username must not exceed 16 characters'],
      match: [/^[a-zA-Z0-9_]+$/, 'Invalid username'],
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Email is required'],
      maxLength: [254, 'Email must not exceed 254 characters'],
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w+)+$/, 'Invalid email'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minLength: [8, 'Password must be at least 6 characters'],
      maxLength: [16, 'Password must not exceed 16 characters'],
      match: [
        /^(?=.*[A-Za-z])(?=.*\d).*$/,
        'Password must at least contain one letter and one number',
      ],
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function () {
  this.password = await bcrypt.hash(this.password, 10);
});

export default model<IUser>('User', userSchema);

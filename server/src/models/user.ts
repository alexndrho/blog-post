import { model, Schema } from 'mongoose';
import IUser from '../types/model/user.js';
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
      required: [true, 'Email is required'],
      maxLength: [254, 'Email must not exceed 254 characters'],
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w+)+$/, 'Invalid email'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minLength: [8, 'Password must be at least 6 characters'],
      maxLength: [16, 'Password must not exceed 16 characters'],
      select: false,
      match: [
        /^(?=.*[A-Za-z])(?=.*\d).*$/,
        'Password must at least contain one letter and one number',
      ],
    },
    profileIconId: {
      type: String,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    location: {
      type: String,
    },
    contact: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    try {
      this.password = await bcrypt.hash(this.password, 10);
    } catch (err) {
      return next(err as Error);
    }
  }
  next();
});

export default model<IUser>('User', userSchema);

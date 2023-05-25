import IBlog from '../types/model/blog.js';

import { model, Schema } from 'mongoose';

const blogSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    snippet: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default model<IBlog>('Blog', blogSchema);

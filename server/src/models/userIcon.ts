import { Schema } from 'mongoose';

const userIconSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: Buffer,
    required: true,
  },
  mime: {
    type: String,
    required: true,
  },
});

export { userIconSchema };

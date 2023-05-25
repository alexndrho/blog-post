import authenticationRoute from './routes/authentication.js';
import userRoute from './routes/user.js';
import blogRoute from './routes/blog.js';

import express, { Express } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app: Express = express();

const PORT: string | number = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
// app.get('/isUserAuth', verifyJWT, (req: Request, res: Response) => {
//   res.json({
//     isloggedIn: true,
//     token: req.headers['x-access-token'],
//   });
// });

app.use(authenticationRoute);
app.use('/user', userRoute);
app.use('/blogs', blogRoute);

const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@blog-post.nfrv2qd.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;

mongoose
  .connect(uri)
  .then(() => {
    app.listen(PORT);
  })
  .catch((err) => {
    console.error(err);
  });

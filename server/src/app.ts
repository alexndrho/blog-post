import blogRoute from './routes/blog';
import userRoute from './routes/authentication';
import { verifyJWT } from './controllers/User/authentication';

import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app: Express = express();

const PORT: string | number = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.get('/isUserAuth', verifyJWT, (req: Request, res: Response) => {
  res.json({ isloggedIn: true, username: (<any>req).user.username });
});

app.use('/blogs', blogRoute);
app.use(userRoute);

const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@blog-post.nfrv2qd.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;

mongoose
  .connect(uri)
  .then(() => {
    app.listen(PORT);
  })
  .catch((err) => {
    console.error(err);
  });

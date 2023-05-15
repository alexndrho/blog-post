import { Request, Response } from 'express';
import IBlog from '../../types/blog';
import IJwtPayLoad from '../../types/IJwtPayLoad';
import Blog from '../../models/blog';

import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

const getBlogs = async (req: Request, res: Response) => {
  try {
    const blogs: IBlog[] = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json({ blogs });
  } catch (err) {
    console.error(err);
  }
};

const getBlog = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json(null);
    }

    const blog: IBlog | any = await Blog.findById(id);
    res.status(200).json({ ...blog._doc });
  } catch (err) {
    console.error(err);
  }
};

const createBlog = async (req: Request, res: Response) => {
  try {
    const token = (req.headers['x-access-token'] as string)?.split(' ')[1];
    const body = req.body as Pick<IBlog, 'title' | 'snippet' | 'body'>;

    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as IJwtPayLoad;

      const blog: IBlog = new Blog({
        userId: decoded.id,
        username: decoded.username,
        title: body.title,
        snippet: body.snippet,
        body: body.body,
      });

      const newBlog: IBlog | any = await blog.save();

      res.status(201).json({ ...newBlog._doc });
    } else {
      throw 'Failed To Authenticate';
    }
  } catch (err) {
    console.error(err);
  }
};

const deleteBlog = async (req: Request, res: Response) => {
  try {
    const deletedBlog: IBlog | any = await Blog.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({ ...deletedBlog._doc });
  } catch (err) {
    console.error(err);
  }
};

export { getBlogs, getBlog, createBlog, deleteBlog };

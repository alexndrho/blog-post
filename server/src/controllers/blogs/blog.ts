import { Request, Response } from 'express';
import IBlog from '../../types/model/blog.js';
import Blog from '../../models/blog.js';
import User from '../../models/user.js';

import mongoose from 'mongoose';

const getBlogs = async (req: Request, res: Response) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json([...blogs]);
  } catch (err) {
    if (!res.headersSent) res.json({ message: 'Unable to get blogs' });
    console.error(err);
  }
};

const getBlogsByUserId = async (req: Request, res: Response) => {
  try {
    const blogs = await Blog.find({ userId: req.params.id }).sort({
      createdAt: -1,
    });

    res.status(200).json([...blogs]);
  } catch (err) {
    if (!res.headersSent)
      res.json({ message: 'Unable to get blogs by user id' });
    console.error(err);
  }
};

const getBlog = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json(null);
    }

    const blog = await Blog.findById(id);

    if (!blog) throw 'Unable to find blog';

    res.status(200).json({ ...blog._doc });
  } catch (err) {
    if (!res.headersSent) res.json({ message: 'Unable to get blog' });
    console.error(err);
  }
};

const createBlog = async (req: Request, res: Response) => {
  try {
    const body = req.body as Pick<IBlog, 'title' | 'snippet' | 'body'>;
    const user = await User.findById(req.user?.id);

    if (user) {
      const blog: IBlog = new Blog({
        userId: req.user?.id,
        title: body.title,
        snippet: body.snippet,
        body: body.body,
      });

      const newBlog = await blog.save();
      if (!newBlog) throw 'Unable to save blog';

      res.status(201).json(newBlog._doc._id);
    } else {
      throw 'Failed To Authenticate';
    }
  } catch (err) {
    if (!res.headersSent) res.json({ message: 'Unable to create blog' });
    console.error(err);
  }
};

const deleteBlog = async (req: Request, res: Response) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);

    if (!deletedBlog) throw 'Unable to find blog';

    res.status(200).json({ ...deletedBlog._doc });
  } catch (err) {
    if (!res.headersSent) res.json({ message: 'Unable to delete blog' });
    console.error(err);
  }
};

export { getBlogs, getBlogsByUserId, getBlog, createBlog, deleteBlog };
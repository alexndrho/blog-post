import { Request, Response } from 'express';
import IBlog from '../../types/blog';
import Blog from '../../models/blog';
import mongoose from 'mongoose';

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

    const blog: IBlog | any | null = await Blog.findById(id);
    res.status(200).json({ ...blog._doc });
  } catch (err) {
    console.log(err);
  }
};

const createBlog = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const body = req.body as Pick<IBlog, 'title' | 'snippet' | 'body'>;

    const blog: IBlog = new Blog({
      title: body.title,
      snippet: body.snippet,
      body: body.body,
    });

    const newBlog: IBlog | any = await blog.save();

    res.status(201).json({ ...newBlog._doc });
  } catch (err) {
    console.error(err);
  }
};

const deleteBlog = async (req: Request, res: Response) => {
  try {
    const deletedBlog: IBlog | any | null = await Blog.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({ ...deletedBlog._doc });
  } catch (err) {
    console.error(err);
  }
};

export { getBlogs, getBlog, createBlog, deleteBlog };

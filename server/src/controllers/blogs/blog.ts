import { Request, Response } from 'express';
import IBlog from '../../types/model/IBlog.js';
import Blog from '../../models/blog.js';
import User from '../../models/user.js';
import paginate from '../../helpers/paginate.js';

import mongoose from 'mongoose';

const getBlogs = async (req: Request, res: Response) => {
  try {
    const page: number = req.query.page
      ? parseInt(req.query.page as string)
      : 1;

    const { documents: blogs, totalPages } = await paginate(Blog, page);

    res.status(200).json({ dataBlogs: [...blogs], totalPages });
  } catch (err) {
    if (!res.headersSent) {
      if (err instanceof Error) {
        res.status(400).json({ error: { message: err.message } });
      } else {
        res.status(500).json({ error: { message: 'An error occured' } });
      }
    }
  }
};

const getBlogsByUserId = async (req: Request, res: Response) => {
  try {
    const blogs = await Blog.find({ userId: req.params.id }).sort({
      createdAt: -1,
    });

    if (!blogs) throw 'Unable to find blogs';

    res.status(200).json([...blogs]);
  } catch (err) {
    if (!res.headersSent) {
      if (err instanceof Error) {
        res.status(400).json({ error: { message: err.message } });
      } else {
        res.status(500).json({ error: { message: 'An error occured' } });
      }
    }
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
    if (!res.headersSent) {
      if (err instanceof Error) {
        res.status(400).json({ error: { message: err.message } });
      } else {
        res.status(500).json({ error: { message: 'An error occured' } });
      }
    }
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
      if (!newBlog) throw 'Unable to create blog';

      res.status(201).json({ id: newBlog._doc._id });
    } else {
      throw 'Failed To Authenticate';
    }
  } catch (err) {
    if (!res.headersSent) {
      if (err instanceof Error) {
        res.status(400).json({ error: { message: err.message } });
      } else {
        res.status(500).json({ error: { message: 'An error occured' } });
      }
    }
  }
};

const deleteBlog = async (req: Request, res: Response) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);

    if (!deletedBlog) throw 'Unable to find blog';

    res.status(200).json({ ...deletedBlog._doc });
  } catch (err) {
    if (!res.headersSent) {
      if (err instanceof Error) {
        res.status(400).json({ error: { message: err.message } });
      } else {
        res.status(500).json({ error: { message: 'An error occured' } });
      }
    }
  }
};

export { getBlogs, getBlogsByUserId, getBlog, createBlog, deleteBlog };

import { Request, Response } from 'express';
import IBlog from '../../types/blog';
import Blog from '../../models/blog';

const getBlogs = async (req: Request, res: Response) => {
  try {
    const blogs: IBlog[] = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json({ blogs });
  } catch (err) {
    console.error(err);
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

    const newBlog: IBlog = await blog.save();
    const allBlog: IBlog[] = await Blog.find();

    res
      .status(201)
      .json({ message: 'Blog added', blog: newBlog, blogs: allBlog });
  } catch (err) {
    console.error(err);
  }
};

const deleteBlog = async (req: Request, res: Response) => {
  try {
    const deletedBlog: IBlog | null = await Blog.findByIdAndDelete(
      req.params.id
    );
    const allBlogs: IBlog[] = await Blog.find();

    res.status(200).json({
      message: 'Blog Deleted',
      blog: deletedBlog,
      blogs: allBlogs,
    });
  } catch (err) {
    console.error(err);
  }
};

export { getBlogs, createBlog, deleteBlog };

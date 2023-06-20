import { Router } from 'express';
import { verifyToken } from '../middlewares/user/verifyToken.js';
import {
  getBlogs,
  getBlogsByUserId,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
} from '../controllers/blogs/blog.js';

const router: Router = Router();

router.get('/', getBlogs);
router.post('/', verifyToken, createBlog);

router.get('/user/:id', getBlogsByUserId);
router.delete('/delete-blog/:id', deleteBlog);

router.get('/:id', getBlog);
router.put('/:id', verifyToken, updateBlog);

export default router;

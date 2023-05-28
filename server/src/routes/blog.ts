import { Router } from 'express';
import { verifyToken } from '../middlewares/user/verifyToken.js';
import {
  getBlogs,
  getBlog,
  createBlog,
  deleteBlog,
} from '../controllers/Blogs/blog.js';

const router: Router = Router();

router.get('/', getBlogs);
router.post('/', verifyToken, createBlog);
router.delete('/delete-blog/:id', deleteBlog);
router.get('/:id', getBlog);

export default router;

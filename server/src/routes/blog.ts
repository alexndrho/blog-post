import { Router } from 'express';
import { verifyToken } from '../middlewares/user/verifyToken';
import {
  getBlogs,
  getBlog,
  createBlog,
  deleteBlog,
} from '../controllers/Blogs/blog';

const router: Router = Router();

router.get('/', getBlogs);
router.post('/', verifyToken, createBlog);
router.delete('/delete-blog/:id', deleteBlog);
router.get('/:id', getBlog);

export default router;

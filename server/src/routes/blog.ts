import { Router } from 'express';
import {
  getBlogs,
  getBlog,
  createBlog,
  deleteBlog,
} from '../controllers/Blogs/blog';

const router: Router = Router();

router.get('/', getBlogs);
router.post('/', createBlog);
router.delete('/delete-blog/:id', deleteBlog);
router.get('/:id', getBlog);

export default router;

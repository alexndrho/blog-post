import { Router } from 'express';
import { getBlogs, createBlog, deleteBlog } from '../controllers/Blogs';

const router: Router = Router();

router.get('/', getBlogs);
router.post('/', createBlog);
router.delete('/delete-blog/:id', deleteBlog);

export default router;

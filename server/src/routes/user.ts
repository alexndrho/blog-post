import { updateUser } from '../controllers/User/user';
import { uploadIcon } from '../middlewares/uploadIcon';
import { Router } from 'express';
import { verifyToken } from '../middlewares/user/verifyToken';

const router = Router();

router.post('/', verifyToken, uploadIcon.single('image'), updateUser);

export default router;

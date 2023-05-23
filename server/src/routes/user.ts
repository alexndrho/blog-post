import { getUserInfo, updateUser } from '../controllers/user/user';
import { uploadIcon } from '../middlewares/uploadIcon';
import { Router } from 'express';
import { verifyToken } from '../middlewares/user/verifyToken';

const router = Router();

router.get('/', verifyToken, getUserInfo);
router.post('/', verifyToken, uploadIcon.single('image'), updateUser);

export default router;

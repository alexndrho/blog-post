import {
  getUserIcon,
  getUserInfo,
  updateUser,
} from '../controllers/user/user.js';
import { uploadIcon } from '../middlewares/uploadIcon.js';
import { Router } from 'express';
import { verifyToken } from '../middlewares/user/verifyToken.js';

const router = Router();

router.get('/', verifyToken, getUserInfo);
router.put('/', verifyToken, uploadIcon.single('profileIcon'), updateUser);
router.get('/icon', verifyToken, getUserIcon);

export default router;

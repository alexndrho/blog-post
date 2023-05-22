import { updateUser } from '../controllers/User/user';
import { uploadIcon } from '../middlewares/uploadIcon';
import { Router } from 'express';

const router = Router();

router.post('/', uploadIcon.single('image'), updateUser);

export default router;

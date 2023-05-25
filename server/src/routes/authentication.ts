import { Router } from 'express';
import { verifyToken } from '../middlewares/user/verifyToken.js';
import {
  signUp,
  logIn,
  verifyUser,
} from '../controllers/user/authentication.js';

const router: Router = Router();

router.get('/isUserAuth', verifyToken, verifyUser);
router.post('/signup', signUp);
router.post('/login', logIn);

export default router;

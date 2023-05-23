import { Router } from 'express';
import { verifyToken } from '../middlewares/user/verifyToken';
import { signUp, logIn, verifyUser } from '../controllers/User/authentication';

const router: Router = Router();

router.get('/isUserAuth', verifyToken, verifyUser);
router.post('/signup', signUp);
router.post('/login', logIn);

export default router;

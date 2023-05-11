import { Router } from 'express';
import { signUp, logIn } from '../controllers/User/authentication';

const router: Router = Router();

router.post('/register', signUp);
router.post('/login', logIn);

export default router;

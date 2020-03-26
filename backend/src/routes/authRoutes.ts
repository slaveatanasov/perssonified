import { Router } from 'express';

import * as authController from '../controllers/AuthController';
import * as userController from '../controllers/UserController';

const router = Router();

router.post('/register', userController.registerUser);
router.post('/login', authController.login);

export default router;
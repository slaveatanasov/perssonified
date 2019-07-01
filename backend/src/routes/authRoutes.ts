import { Router } from 'express';

const authController = require('../controllers/AuthController');
const userController = require('../controllers/UserController');

const router = Router();

router.post('/register', userController.registerUser);
router.post('/login', authController.login);

export default router;
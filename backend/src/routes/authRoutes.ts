import { Router } from 'express';
import passport from 'passport';

const authController = require('../controllers/AuthController');
const userController = require('../controllers/UserController');

const router = Router();

router.post('/register', userController.registerUser);
router.post('/login', passport.authenticate('jwt', {session: false}), authController.login);

export default router;
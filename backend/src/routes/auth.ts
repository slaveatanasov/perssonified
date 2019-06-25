import { Router } from 'express';

const authController = require('../controllers/AuthController');

const router = Router();

router.post('/login', authController.login);

export default router;
import { Router } from 'express';

const userController = require('../controllers/UserController')

const router = Router();

router.get('/getUsers', userController.findAllUsers);
router.get('/getUser', userController.getUserById);

export default router;
import { Router } from 'express';
import passport from 'passport';

const userController = require('../controllers/UserController')

const router = Router();

router.get('/getUsers', passport.authenticate('jwt', { session: false }), userController.findAllUsers);
router.get('/getUser/:id', passport.authenticate('jwt', { session: false }), userController.getUserById);

export default router;
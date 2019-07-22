import { Router } from 'express';
import passport from 'passport';

const userController = require('../controllers/UserController')

const router = Router();

router.get('/', passport.authenticate('jwt', { session: false }), userController.findAllUsers);
router.put('/', passport.authenticate('jwt', { session: false }), userController.updateUser);
router.get('/getCurrentUser', passport.authenticate('jwt', { session: false }), userController.getCurrentUser);
router.get('/getById/:id', passport.authenticate('jwt', { session: false }), userController.getUserById);
router.get('/getByEmail/:email', passport.authenticate('jwt', { session: false }), userController.getUserByEmail);

export default router;
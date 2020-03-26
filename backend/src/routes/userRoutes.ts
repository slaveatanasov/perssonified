import { Router } from 'express';
import passport from 'passport';

import * as userController from '../controllers/UserController';

const router: Router = Router();

router.put('/', passport.authenticate('jwt', { session: false }), userController.updateUser);
router.get('/getCurrent', passport.authenticate('jwt', { session: false }), userController.getCurrentUser);
router.get('/getById/:id', passport.authenticate('jwt', { session: false }), userController.getUserById);
router.get('/getByEmail/:email', passport.authenticate('jwt', { session: false }), userController.getUserByEmail);

export default router;
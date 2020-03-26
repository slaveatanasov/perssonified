import { Router } from 'express';
import passport from 'passport';

import * as tfaController from '../controllers/TfaController';

const router: Router = Router();

router.post('/setup', passport.authenticate('jwt', { session: false }), tfaController.tfaSetup);
router.get('/setup', passport.authenticate('jwt', { session: false }), tfaController.tfaFetch);
router.post('/verify', passport.authenticate('jwt', { session: false }), tfaController.tfaVerify);
router.post('/delete', passport.authenticate('jwt', { session: false }), tfaController.tfaDelete);

export default router;
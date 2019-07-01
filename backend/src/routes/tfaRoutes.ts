import { Router } from 'express';
import passport from 'passport';

const tfaController = require('../controllers/TfaController');

const router = Router();

router.post('/setup', passport.authenticate('jwt', { session: false }), tfaController.tfaCreate);
router.get('/setup', passport.authenticate('jwt', { session: false }), tfaController.tfaFetch);
router.post('/verify', passport.authenticate('jwt', { session: false }), tfaController.tfaVerify);

export default router;
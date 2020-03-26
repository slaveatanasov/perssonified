import { Router, Request, Response, NextFunction } from 'express';

import auth from './authRoutes';
import user from './userRoutes';
import tfa from './tfaRoutes';

const router: Router = Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('API works...')
});
router.use('/auth', auth);
router.use('/user', user);
router.use('/tfa', tfa);

export default router;
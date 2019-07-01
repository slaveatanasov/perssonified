import { Router } from 'express';

const tfaController = require('../controllers/TfaController');

const router = Router();

router.post('/setup', tfaController.tfaCreate);
router.get('/set', tfaController.tfa);

export default router;
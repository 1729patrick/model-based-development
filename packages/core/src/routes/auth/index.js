import { Router } from 'express';

import GeneratorController from '../../app/controllers/GeneratorController';

const router = Router();

router.post('/generators', GeneratorController.store);

export default router;

import { Router } from 'express';

const router = Router();

import GeneratorsService from './app/services/GeneratorsService';

import SongsController from './app/controllers/SongsController';

router.post('/generators', GeneratorsService);

router.get('/songs', SongsController.index);
router.get('/songs/:songId', SongsController.findOne);
router.post('/songs', SongsController.store);
router.put('/songs/:songId', SongsController.update);
router.delete('/songs/:songId', SongsController.delete);

export default router;

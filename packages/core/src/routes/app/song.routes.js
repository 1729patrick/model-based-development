import { Router } from 'express';

const router = Router();

import SongController from '../../app/controllers/SongController';

router.get('/songs', SongController.index);
router.get('/songs/:songId', SongController.findOne);
router.post('/songs', SongController.store);
router.put('/songs/:songId', SongController.update);
router.delete('/songs/:songId', SongController.delete);

export default router;
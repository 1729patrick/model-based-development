import { Router } from 'express';

const router = Router();

import ArtistController from '../../app/controllers/ArtistController';

router.get('/artists', ArtistController.index);
router.get('/artists/:artistId', ArtistController.findOne);
router.post('/artists', ArtistController.store);
router.put('/artists/:artistId', ArtistController.update);
router.delete('/artists/:artistId', ArtistController.delete);

export default router;
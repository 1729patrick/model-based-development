import { Router } from 'express';

const router = Router();

import AlbumController from '../../app/controllers/AlbumController';

router.get('/albums', AlbumController.index);
router.get('/albums/:albumId', AlbumController.findOne);
router.post('/albums', AlbumController.store);
router.put('/albums/:albumId', AlbumController.update);
router.delete('/albums/:albumId', AlbumController.delete);

export default router;
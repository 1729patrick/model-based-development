import { Router } from 'express';

const router = Router();

import GenreController from '../../app/controllers/GenreController';

router.get('/genres', GenreController.index);
router.get('/genres/:genreId', GenreController.findOne);
router.post('/genres', GenreController.store);
router.put('/genres/:genreId', GenreController.update);
router.delete('/genres/:genreId', GenreController.delete);

export default router;
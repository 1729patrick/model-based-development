export default `import { Router } from 'express';

const router = Router();

import {{name}}Controller from '../../app/controllers/{{name}}Controller';

router.get('/{{model}}s', {{name}}Controller.index);
router.get('/{{model}}s/:{{model}}Id', {{name}}Controller.findOne);
router.post('/{{model}}s', {{name}}Controller.store);
router.put('/{{model}}s/:{{model}}Id', {{name}}Controller.update);
router.delete('/{{model}}s/:{{model}}Id', {{name}}Controller.delete);

export default router;`;

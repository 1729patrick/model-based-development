import Mustache from 'mustache';

import fs from 'fs';
import { resolve } from 'path';
import { ROUTER_PATH } from '../../config/path';

class RouterService {
  async run({ args }) {
    const model = Mustache.render(
      `import { Router } from 'express';

const router = Router();

import {{name}}Controller from '../../app/controllers/{{name}}Controller';

router.get('/{{model}}s', {{name}}Controller.index);
router.get('/{{model}}s/:{{model}}Id', {{name}}Controller.findOne);
router.post('/{{model}}s', {{name}}Controller.store);
router.put('/{{model}}s/:{{model}}Id', {{name}}Controller.update);
router.delete('/{{model}}s/:{{model}}Id', {{name}}Controller.delete);

export default router;`,
      args
    );

    fs.writeFileSync(
      resolve('src', 'routes', 'app', `${args.model}.routes.js`),
      model
    );

    this.addRoutesInIndex(args);

    return model;
  }

  addRoutesInIndex({ name, model }) {
    const appRoutes = fs.readFileSync(resolve(ROUTER_PATH, 'index.js'), 'utf8');

    const appRoutesWithImport = `import ${name}Routes from './${model}.routes';
${appRoutes}`;

    const appRouterIndented = appRoutesWithImport.replace(
      'export default [];',
      '\nexport default [\n];'
    );

    const appRoutesWithExport = appRouterIndented.replace(
      '];',
      `\t${name}Routes,
];`
    );

    fs.writeFileSync(
      resolve(ROUTER_PATH, 'index.js'),
      appRoutesWithExport,
      () => {}
    );
  }
}

export default new RouterService();

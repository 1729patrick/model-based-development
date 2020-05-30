import Mustache from 'mustache';

import fs from 'fs';
import { resolve } from 'path';
import { ROUTER_PATH } from '../../config/path';
import routerTemplate from '../templates/router';

class RouterService {
  async run({ args }) {
    const model = Mustache.render(routerTemplate, args);

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

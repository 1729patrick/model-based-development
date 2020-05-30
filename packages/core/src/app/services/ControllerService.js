import Mustache from 'mustache';

import fs from 'fs';
import { resolve } from 'path';
import { CONTROLLER_PATH } from '../../config/path';
import controllerTemplate from '../templates/controller';

class ModelService {
  async run({ args }) {
    const model = Mustache.render(controllerTemplate, args);

    fs.writeFileSync(
      resolve(CONTROLLER_PATH, `${args.name}Controller.js`),
      model
    );

    return model;
  }
}

export default new ModelService();

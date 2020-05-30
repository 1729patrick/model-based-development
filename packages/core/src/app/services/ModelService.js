import Mustache from 'mustache';

import fs from 'fs';
import { resolve } from 'path';
import { MODEL_PATH } from '../../config/path';
import modelTemplate from '../templates/model';

class ModelService {
  async run({ args }) {
    const model = Mustache.render(modelTemplate(args), args);

    fs.writeFileSync(resolve(MODEL_PATH, `${args.name}.js`), model);

    return model;
  }
}

export default new ModelService();

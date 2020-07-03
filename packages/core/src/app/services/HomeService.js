import Mustache from 'mustache';

import fs from 'fs';
import { resolve } from 'path';
import { HOME_PATH } from '../../config/path';

class HomeService {
  async run({ args }) {
    const models = fs.readFileSync(resolve(HOME_PATH, 'models.js'), 'utf8');

    const modelsIndented = models.replace(
      'export default [];',
      'export default [\n];'
    );

    const appRoutesWithExport = modelsIndented.replace(
      '];',
      `"\t${args.name}s",
];`
    );

    fs.writeFileSync(
      resolve(HOME_PATH, 'models.js'),
      appRoutesWithExport,
      () => {}
    );
  }
}

export default new HomeService();

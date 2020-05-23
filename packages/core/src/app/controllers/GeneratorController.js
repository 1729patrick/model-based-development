import ModelService from '../services/ModelService';
import ControllerService from '../services/ControllerService';
import RouterService from '../services/RouterService';
import DatabaseService from '../services/DatabaseService';
import ViewService from '../services/ViewService';

import { resolve } from 'path';

import fs from 'fs';

class GeneratorController {
  async store(req, res) {
    const { title: name, properties, required, references } = req.body;

    const args = {
      name,
      model: name.toLowerCase(),
      properties,
      required,
      references,
    };

    const schemaPath = resolve('src', 'schemas', `${name}.json`);
    if (fs.existsSync(schemaPath)) {
      return res.status(400).json({ error: 'Model already exist.' });
    }

    const [model, controller, router, table, view] = await Promise.all([
      DatabaseService.run({ args }),
      ModelService.run({ args }),
      ControllerService.run({ args }),
      RouterService.run({ args }),
      ViewService.run({ args }),
    ]);

    fs.writeFileSync(schemaPath, JSON.stringify(req.body, undefined, '  '));

    return res.json({ model, controller, router, table, view });
  }
}

export default new GeneratorController();

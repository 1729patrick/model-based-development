import ModelService from '../services/ModelService';
import ControllerService from '../services/ControllerService';
import RouterService from '../services/RouterService';

class GeneratorController {
  async store(req, res) {
    const { title: name, properties } = req.body;

    const args = {
      name,
      model: name.toLowerCase(),
      properties,
    };

    const [model, controller, router] = await Promise.all([
      ModelService.run({ args }),
      ControllerService.run({ args }),
      RouterService.run({ args }),
    ]);

    return res.json({ model, controller, router });
  }
}

export default new GeneratorController();

// await database.schema.createTable(name, function(t) {
//   t.increments('id').primary();
//   t.string('name', 100);
//   t.string('album', 100);
// });

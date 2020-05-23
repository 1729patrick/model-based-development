import ModelService from '../services/ModelService';
import ControllerService from '../services/ControllerService';
import RouterService from '../services/RouterService';
import DatabaseService from '../services/DatabaseService';
import ViewService from '../services/ViewService';

class GeneratorController {
  async store(req, res) {
    const { title: name, properties } = req.body;

    const args = {
      name,
      model: name.toLowerCase(),
      properties,
    };
    const [model, controller, router, table, view] = await Promise.all([
      DatabaseService.run({ args }),
      ModelService.run({ args }),
      ControllerService.run({ args }),
      RouterService.run({ args }),
      ViewService.run({ args }),
    ]);

    return res.json({ model, controller, router, table, view });
  }
}

export default new GeneratorController();

import Mustache from 'mustache';

import fs from 'fs';
import { resolve } from 'path';
import { CONTROLLER_PATH } from '../../config/path';

class ModelService {
  async run({ args }) {
    const model = Mustache.render(
      `import {{name}} from '../models/{{name}}';

class {{name}}Controller {
  async index(_, res) {
    const {{model}} = new {{name}}();

    const {{model}}s = await {{model}}.findAll();
    const columns = Object.keys({{model}}.toJSON());

    return res.json({ columns, {{model}}s });
  }

  async store(req, res) {
    const {{model}} = await new {{name}}(req.body).insert();

    return res.json({{model}});
  }

  async update(req, res) {
    const { {{model}}Id } = req.params;

    const {{model}} = await new {{name}}().update({ id: {{model}}Id }, req.body);

    return res.json({{model}});
  }

  async delete(req, res) {
    const { {{model}}Id } = req.params;

    await new {{name}}().delete({ id: {{model}}Id });

    return res.send();
  }

  async findOne(req, res) {
    const { {{model}}Id } = req.params;
    const {{model}} = (await new {{name}}().findBy({ id: {{model}}Id }))[0];

    return res.json({{model}});
  }
}

export default new {{name}}Controller();`,
      args
    );

    fs.writeFileSync(
      resolve(CONTROLLER_PATH, `${args.name}Controller.js`),
      model
    );

    return model;
  }

  getPropertiesContructor({ properties, model }) {
    let propertiesFormatted = ``;
    for (const property in properties) {
      propertiesFormatted += `\n\t\tthis.${property} = ${model}.${property};`;
    }

    return propertiesFormatted;
  }

  getPropertiesJSON({ properties }) {
    let propertiesFormatted = ``;
    for (const property in properties) {
      propertiesFormatted += `\n\t\t\t${property}: this.${property},`;
    }

    return propertiesFormatted;
  }
}

export default new ModelService();

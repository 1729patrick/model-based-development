import Mustache from 'mustache';

import fs from 'fs';
import { resolve } from 'path';
import { MODEL_PATH } from '../../config/path';

class ModelService {
  async run({ args }) {
    const model = Mustache.render(
      `import Model from '../../libraries/Model';

class {{name}} extends Model {
  constructor({{model}} = {}) {
    super('{{name}}', {{model}});

    this.id = {{model}}.id;${this.getPropertiesContructor(args)}
  }

  JSON() {
    return {
      id: this.id,${this.getPropertiesJSON(args)}
    };
  }
}

export default {{name}};`,
      args
    );

    fs.writeFileSync(resolve(MODEL_PATH, `${args.name}.js`), model);

    return model;
  }

  getPropertiesContructor({ properties, references = [], model }) {
    let propertiesFormatted = ``;
    for (const property in properties) {
      propertiesFormatted += `\n\t\tthis.${property} = ${model}.${property};`;
    }

    for (const reference of references) {
      const tableName = `${reference.model.toLowerCase()}_id`;

      propertiesFormatted += `\n\t\tthis.${tableName} = ${model}.${tableName};`;
    }

    return propertiesFormatted;
  }

  getPropertiesJSON({ properties, references = [] }) {
    let propertiesFormatted = ``;
    for (const property in properties) {
      propertiesFormatted += `\n\t\t\t${property}: this.${property},`;
    }

    for (const reference of references) {
      const tableName = `${reference.model.toLowerCase()}_id`;

      propertiesFormatted += `\n\t\t\t${tableName}: this.${tableName},`;
    }

    return propertiesFormatted;
  }
}

export default new ModelService();

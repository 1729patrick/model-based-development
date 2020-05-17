import Mustache from 'mustache';

import fs from 'fs';
import { resolve } from 'path';

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

    fs.writeFile(
      resolve('src', 'app', 'models', `${args.name}.js`),
      model,
      () => {}
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

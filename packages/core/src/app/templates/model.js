export default args => `import Model from '../../libraries/Model';

class {{name}} extends Model {
  constructor({{model}} = {}) {
    super('{{name}}', {{model}});

    this.id = {{model}}.id;${getPropertiesContructor(args)}
  }

  toJSON() {
    return {
      id: this.id,${getPropertiesJSON(args)}
    };
  }
}

export default {{name}};`;

const getPropertiesContructor = ({ properties, references = [], model }) => {
  let propertiesFormatted = ``;
  for (const property in properties) {
    propertiesFormatted += `\n\t\tthis.${property} = ${model}.${property};`;
  }

  for (const reference of references) {
    const tableName = `${reference.model.toLowerCase()}_id`;

    propertiesFormatted += `\n\t\tthis.${tableName} = ${model}.${tableName};`;
  }

  return propertiesFormatted;
};

const getPropertiesJSON = ({ properties, references = [] }) => {
  let propertiesFormatted = ``;
  for (const property in properties) {
    propertiesFormatted += `\n\t\t\t${property}: this.${property},`;
  }

  for (const reference of references) {
    const tableName = `${reference.model.toLowerCase()}_id`;

    propertiesFormatted += `\n\t\t\t${tableName}: this.${tableName},`;
  }

  return propertiesFormatted;
};

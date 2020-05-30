export default args => `import Model from '../../libraries/Model';

class {{name}} extends Model {
  constructor({{model}} = {}) {
    super('{{name}}', {{model}});

    this.id = {{model}}.id;${getPropertiesContructor(args)}
  }

  get columns() {
    return [
      { field: 'id', type: 'numeric' },${getPropertiesColumns(args)}
    ];
  }
${getFindAllRelations(args)}}

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

const getPropertiesColumns = ({ properties, references = [] }) => {
  const types = {
    string: 'string',
    date: 'date',
    integer: 'numeric',
  };

  let propertiesFormatted = ``;
  for (const property in properties) {
    const type = properties[property].type;

    propertiesFormatted += `\n\t\t\t{ field: '${property}', type: '${types[type]}' },`;
  }

  for (const reference of references) {
    const tableName = `${reference.model.toLowerCase()}_id`;

    propertiesFormatted += `\n\t\t\t{ field: '${tableName}', type: 'numeric' },`;
  }

  return propertiesFormatted;
};

const getFindAllRelations = ({ references, name, model }) => {
  if (!references) {
    return '';
  }

  let fns = '';
  let projection = `['${name}.*'`;
  references.forEach(({ model: modelRef, relation }) => {
    if (relation === 'M-M') {
      fns += `\n\t\t\t\t.leftJoin('${name}${modelRef}', '${name}.id', '${name}${modelRef}.${model}_id')`;
      projection += `, '${name}${modelRef}.${modelRef.toLowerCase()}_id'`;
    }
  });

  return `
  findAll() {
    let join = (database, tableName) =>
      database
        .select(${projection}])
        .from(tableName)${fns};

    return super.findAll(join);
  }\n`;
};

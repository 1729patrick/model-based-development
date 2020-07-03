export default args => `import Model from '../../libraries/Model';

class {{name}} extends Model {
  constructor({{model}} = {}) {
    super('{{name}}', {{model}});

    this.id = {{model}}.id;${getPropertiesContructor(args)}
  }

  get columns() {
    return [${getPropertiesColumns(args)}
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

    propertiesFormatted += `\n\t\t\t{ field: '${tableName}', type: ${
      reference.relation === 'M-1' ? '"select"' : '"checkbox"'
    } },`;
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

  const mmRelation = references.filter(({ relation }) => relation === 'M-M');

  const getGroupRelationsMM = () => {
    let consts = `const ${model}s = {};`;
    let checkExists = ``;
    let references = `${model}s[${model}.${model}_id] = { ...${model}, id: ${model}.${model}_id };`;
    let returnReferences = ``;

    const referencesName = mmRelation.map(
      ({ model }) => `${model.toLowerCase()}_id`
    );

    referencesName.forEach(modelRef => {
      consts += `\n\t\t\tconst ${modelRef} = {};`;

      checkExists += `\t\t\t\tif (!${modelRef}[${model}.${model}_id]) {
          ${modelRef}[${model}.${model}_id] = new Set();
        }\n\n`;

      references += `\n\t\t\t\t${modelRef}[${model}.${model}_id].add(${model}.${modelRef});`;
      returnReferences += `\n\t\t\t\t\t${modelRef}: [...${modelRef}[id]],`;
    });

    return `
      ${consts}
      
      results.forEach(${model} => {
${checkExists}
        ${references}
      });

      return Object.entries(${model}s).map(([id, ${model}]) => {
        const { ${model}_id, ...withoutId } = ${model};

        return {
          ...withoutId,${returnReferences}
        };
      });
    `;
  };

  return `
  findAll() {
    let join = async (database, tableName) => {
      const results = await database
        .select(${projection}])
        .from(tableName)${fns};

        ${mmRelation.length ? getGroupRelationsMM() : `return results;`}
    }

    return super.findAll(join);
  }\n`;
};

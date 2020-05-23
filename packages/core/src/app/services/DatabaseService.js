import database from '../../database';
class DatabaseService {
  async run({ args }) {
    const types = {
      string: 'string',
      date: 'timestamps',
      integer: 'integer',
      boolean: 'boolean',
    };

    const table = await database.schema.createTable(args.name, table => {
      table.increments('id').primary();

      Object.entries(args.properties).forEach(([key, property]) => {
        const type = types[property.type];
        const column = table[type](key, property.maxLength);

        const isNullable = args.required.includes(key)
          ? 'notNullable'
          : 'nullable';

        column[isNullable]();
      });

      args.references.forEach(async ({ model, relation }) => {
        const tableName = `${model.toLowerCase()}_id`;

        if (relation === 'M-M') {
          await database.schema.createTable(`${args.name}${model}`, table => {
            table.increments('id').primary();

            const tableName1 = `${args.model}_id`;

            table
              .integer(tableName)
              .unsigned()
              .notNullable();

            table
              .integer(tableName1)
              .unsigned()
              .notNullable();

            table
              .foreign(tableName)
              .references('id')
              .inTable(model);

            table
              .foreign(tableName1)
              .references('id')
              .inTable(args.name);
          });

          return;
        }

        table
          .integer(tableName)
          .unsigned()
          .notNullable();

        table
          .foreign(tableName)
          .references('id')
          .inTable(model);
      });
    });

    return table;
  }
}

export default new DatabaseService();

import database from '../../database';
class DatabaseService {
  async run({ args }) {
    const types = {
      string: 'string',
      date: 'datetime',
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

      (args.references || []).forEach(async ({ model, relation }) => {
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

      table
        .timestamp('created_at', { useTz: true })
        .notNullable()
        .defaultTo(database.fn.now());
      table.timestamp('updated_at');
    });

    return table;
  }
}

export default new DatabaseService();

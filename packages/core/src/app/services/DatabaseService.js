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
        table[type](key, property.maxLength);
      });
    });

    return table;
  }
}

export default new DatabaseService();

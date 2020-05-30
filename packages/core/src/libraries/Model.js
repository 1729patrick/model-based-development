import database from '../database';

class Model {
  constructor(tableName, model) {
    this.model = model;
    this.table = database(tableName);
    this.tableName = tableName;
    this.tableNameId = `${tableName.toLowerCase()}_id`;
  }

  async getMetadata(model_ = this.model) {
    return new Promise(async resolve => {
      const model = {};
      const relations = [];

      for (let [index, record] of Object.entries(model_).entries()) {
        const [column, value] = record;

        const [table, _] = column.split('_');
        const tableName = `${this.tableName}${table
          .charAt(0)
          .toUpperCase()}${table.slice(1)}`;

        const tableExists = await database.schema.hasTable(tableName);

        if (tableExists) {
          relations.push({ tableName, column });
        } else {
          model[column] = value;
        }

        if (index === Object.entries(model_).length - 1)
          resolve({ model, relations });
      }
    });
  }

  async insert() {
    const { model, relations } = await this.getMetadata();

    const [tableInsertedId] = await this.table.insert(model).returning('id');

    relations.forEach(async ({ column, tableName }) => {
      await database(tableName).insert({
        [column]: this.model[column],
        [this.tableNameId]: tableInsertedId,
      });
    });

    return [tableInsertedId];
  }

  delete(condition) {
    return this.table
      .delete()
      .where(condition)
      .del();
  }

  async update({ id }, newModel) {
    const { model, relations } = await this.getMetadata(newModel);

    relations.forEach(async ({ column, tableName }) => {
      await database(tableName)
        .update({
          [column]: newModel[column],
        })
        .where({ [this.tableNameId]: id });
    });

    return this.table.update(model).where({ id });
  }

  findBy(condition) {
    return database
      .select()
      .where(condition)
      .from(this.tableName);
  }

  async findAll(join) {
    if (typeof join === 'function') {
      return join(database, this.tableName);
    }

    return database.select().from(this.tableName);
  }
}

export default Model;

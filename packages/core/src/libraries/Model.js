import database from '../database';

class Model {
  constructor(tableName, model) {
    this.model = model;
    this.table = database(tableName);
    this.tableName = tableName;
  }

  insert() {
    return this.table.insert(this.model);
  }

  delete(condition) {
    return this.table
      .delete()
      .where(condition)
      .del();
  }

  update(condition, newModel) {
    return this.table.update(newModel).where(condition);
  }

  findBy(condition) {
    return database
      .select()
      .where(condition)
      .from(this.tableName);
  }

  async findAll() {
    return database.select().from(this.tableName);
  }
}

export default Model;

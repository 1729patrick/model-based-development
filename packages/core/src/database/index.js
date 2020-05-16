import knex from 'knex';

import databaseConfig from '../config/database';

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = knex(databaseConfig);
  }
}

export default new Database().connection;

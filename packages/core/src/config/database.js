import { resolve } from 'path';

export default {
  client: 'sqlite3',
  connection: () => ({
    filename: resolve('src', 'database', process.env.SQLITE_FILENAME),
  }),
  useNullAsDefault: true,
};

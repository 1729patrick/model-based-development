import { resolve } from 'path';

export default {
  client: 'sqlite3',
  connection: () => ({
    filename: resolve('src', 'database', process.env.SQLITE_FILENAME),
  }),
  useNullAsDefault: true,
};

// export default {
//   client: 'pg',
//   connection: {
//     host: '127.0.0.1',
//     user: 'postgres',
//     password: process.env.PASSWORD,
//     database: 'dbm',
//   },
// };

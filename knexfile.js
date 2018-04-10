require('dotenv').config();

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME_DEVELOPMENT || 'clinvitae',
    },
    migrations: {
      directory: './database/migrations',
    },
    debug: false,
  },

  test: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME_TEST || 'clinvitae-test',
    },
    migrations: {
      directory: './database/migrations',
    },
    seeds: {
      directory: './test/seeds',
    },
    debug: false,
  },
};

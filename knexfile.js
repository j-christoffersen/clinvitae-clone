require('dotenv').config();

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      user: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: 'clinvitae',
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
      user: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: 'clinvitae-test',
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

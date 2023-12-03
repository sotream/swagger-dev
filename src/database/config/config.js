module.exports = {
  development: {
    database: process.env.POSTGRES_DATABASE,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    dialect: 'postgres',
    dialectModule: require('pg'),
    host: process.env.POSTGRES_HOST,
    logging: false,
  },
  production: {
    database: process.env.POSTGRES_DATABASE,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    dialect: 'postgres',
    dialectModule: require('pg'),
    host: process.env.POSTGRES_HOST,
    logging: false,
  },
  test: {
    database: process.env.POSTGRES_DATABASE,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    dialect: 'postgres',
    dialectModule: require('pg'),
    host: process.env.POSTGRES_HOST,
    logging: false,
  },
};

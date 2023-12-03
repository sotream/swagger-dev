const env = process.env.NODE_ENV || 'development';

const fs = require('node:fs');
const path = require('node:path');
const Sequelize = require('sequelize');

const modelPath = `${process.cwd()}/src/database/models/`;
const basename = path.basename(`${__dirname}/../../database/models/index.js`);
const config = require(path.resolve(`${__dirname}/../config/config.js`))[env];

// eslint-disable-next-line object-curly-newline
const db = {};

let sequelize;

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config,
  );
}

fs.readdirSync(modelPath)
  .filter(
    (file) =>
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js',
  )
  .forEach((file) => {
    const model = require(path.resolve(`${__dirname}/../models/${file}`))(
      sequelize,
      Sequelize.DataTypes,
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

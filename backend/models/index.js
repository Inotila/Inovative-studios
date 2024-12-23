'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Function to load models from a directory
const loadModels = (directory) => {
  fs
    .readdirSync(directory)
    .filter(file => {
      return (
        file.indexOf('.') !== 0 &&
        file.slice(-3) === '.js' &&
        file.indexOf('.test.js') === -1
      );
    })
    .forEach(file => {
      const model = require(path.join(directory, file))(sequelize, Sequelize.DataTypes);
      db[model.name] = model;
    });
};

// Load models from different directories
loadModels(path.join(__dirname, 'music_models'));
loadModels(path.join(__dirname, 'user_models'));
loadModels(path.join(__dirname, 'video_models'));
loadModels(path.join(__dirname, 'Project_models'));
loadModels(path.join(__dirname, 'service_models'));

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

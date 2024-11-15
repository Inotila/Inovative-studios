'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Project extends Model {
    static associate(models) {
      // Define any associations here 
    }
  }

  Project.init({
    Project_ID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    Like_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    Funding_status: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  }, {
    sequelize,
    modelName: 'Project',
  });

  return Project;
};

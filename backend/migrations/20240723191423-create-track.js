'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tracks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Track_ID: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        unique: true // Ensure uniqueness
      },
      Title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      Play_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      Download_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      Like_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      Album_ID: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Albums',
          key: 'Album_ID',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    // Add index for Album_ID to support foreign key constraint
    await queryInterface.addIndex('Tracks', ['Album_ID']);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Tracks');
  }
};

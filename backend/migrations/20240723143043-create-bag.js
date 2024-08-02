'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Bags', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      User_ID: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Users', // Ensure this matches the Users table name
          key: 'User_ID'
        },
        onDelete: 'CASCADE', // Automatically delete bags if the user is deleted
      },
      Items: {
        type: Sequelize.JSON, // Use JSON for MySQL
        allowNull: true // Optional field
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Bags');
  }
};

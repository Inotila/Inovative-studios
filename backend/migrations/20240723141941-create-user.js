'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      User_ID: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4, // Automatically generate UUIDs
        allowNull: false
      },
      Username: {
        type: Sequelize.STRING,
        allowNull: false
      },
      Email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true // Ensure emails are unique
      },
      Shopping_bag_items: {
        type: Sequelize.UUID,
        allowNull: true // Optional foreign key reference
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
    await queryInterface.dropTable('Users');
  }
};

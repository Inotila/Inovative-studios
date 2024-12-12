'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Albums', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Album_ID: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        unique: true
      },
      Title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      Download_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      Like_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      Album_cover_art: {  // Add this line to store the cover image URL
        type: Sequelize.STRING,  // This is for storing a URL or file path as a string
        allowNull: true,  // It's okay if some albums don't have a cover art
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
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Albums');
  }
};

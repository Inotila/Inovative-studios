'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Services', {
      Service_ID: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      Title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Type: {
        type: Sequelize.STRING, 
        allowNull: false,
      },
      General_description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Thumbnail_cover: {
        type: Sequelize.STRING, 
        allowNull: false,
      },
      Availability: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isIn: [['Open to work', 'On assignment', 'Unavailable', 'Open to enquiry']],
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Services');
  }
};

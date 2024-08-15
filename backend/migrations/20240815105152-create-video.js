'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Videos', {
      Video_ID: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      Series_ID: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Series', 
          key: 'Series_ID',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      Like_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      Play_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      Download_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
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
    await queryInterface.dropTable('Videos');
  }
};

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PaidContents', {
      Paid_content_ID: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      User_ID: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Users', 
          key: 'User_ID',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      Album_ID: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'Albums', 
          key: 'Album_ID',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      Track_ID: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'Tracks', 
          key: 'Track_ID',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      Paid_date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
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

    await queryInterface.addIndex('PaidContents', ['User_ID']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('PaidContents');
  }
};

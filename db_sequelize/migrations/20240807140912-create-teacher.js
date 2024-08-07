'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('teachers', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING(128),
        allowNull: false
      },
      family: {
        type: Sequelize.STRING(128),
        allowNull: false
      },
      email: {
        type: Sequelize.STRING(126),
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: true
      },
      phone_number: {
        type: Sequelize.STRING(11),
        allowNull: true,
        unique: true
      },
      about: {
        type: Sequelize.STRING(256),
        allowNull: true
      },
      school_id: {
        type: Sequelize.UUID,
        allowNull: true
      },
      profile_picture: {
        type: Sequelize.STRING,
        allowNull: true
      },
      major_id: {
        type: Sequelize.UUID,
        allowNull: true
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    await queryInterface.addIndex('teachers', ['email'], { unique: true });
    await queryInterface.addIndex('teachers', ['phone_number'], { unique: true });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('teachers');
  }
};

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('teacher_tokens', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false
      },
      teacher_id: {
        type: Sequelize.UUID,
        allowNull: false
      },
      ip: {
        type: Sequelize.STRING,
        allowNull: false
      },
      platform: {
        type: Sequelize.ENUM('Web', 'Mobile', 'Desktop'),
        allowNull: false
      },
      device_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      os: {
        type: Sequelize.STRING,
        allowNull: false
      },
      user_agent: {
        type: Sequelize.STRING,
        allowNull: false
      },
      token_id: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      last_activity: {
        type: Sequelize.DATE,
        allowNull: true
      },
      api_version: {
        type: Sequelize.STRING,
        allowNull: false
      },
      expire_at: {
				type: Sequelize.DATE,
        allowNull : false
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
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('teacher_tokens');
  }
};

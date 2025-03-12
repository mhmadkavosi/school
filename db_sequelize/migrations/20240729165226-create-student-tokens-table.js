'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('student_tokens', {
			id: {
				type: Sequelize.UUID,
				primaryKey: true,
				defaultValue: Sequelize.UUIDV4
			},
			student_id: {
				type: Sequelize.UUID,
				allowNull: false,
				references: {
					model: 'students',
					key: 'id'
				},
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE'
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
				type: Sequelize.DATE
			},
			created_at: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
			},
			updated_at: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
			}
		});

		// Add index on student_id and token_id
		await queryInterface.addIndex('student_tokens', ['student_id', 'token_id']);
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('student_tokens');
	}
};

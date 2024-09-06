'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('exams', {
			id: {
				type: Sequelize.UUID,
				primaryKey: true,
				defaultValue: Sequelize.UUIDV4,
				allowNull: false
			},
			title: {
				type: Sequelize.STRING,
				allowNull: false
			},
			date: {
				type: Sequelize.DATE,
				allowNull: false
			},
			start_hour: {
				type: Sequelize.STRING,
				allowNull: true
			},
			end_hour: {
				type: Sequelize.STRING,
				allowNull: true
			},
			description: {
				type: Sequelize.STRING,
				allowNull: true
			},
			type: {
				type: Sequelize.ENUM('important'),
				allowNull: true
			},
			color: {
				type: Sequelize.STRING,
				allowNull: true
			},
			teacher_id: {
				type: Sequelize.UUID,
				allowNull: false,
				references: {
					model: 'teachers', // The table name of the Teacher model
					key: 'id'
				},
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE'
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
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('exams');
	}
};

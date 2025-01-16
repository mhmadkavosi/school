'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('schedule_assigns', {
			id: {
				type: Sequelize.UUID,
				primaryKey: true,
				defaultValue: Sequelize.UUIDV4
			},
			assign_to: {
				type: Sequelize.UUID,
				allowNull: false
			},
			assign_to_target: {
				type: Sequelize.ENUM('class', 'student', 'teacher'),
				allowNull: false
			},
			schedule_id: {
				type: Sequelize.UUID,
				allowNull: false,
				references: {
					model: 'schedules', // Make sure the table name matches your ScheduleModel
					key: 'id'
				},
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE'
			},
			created_at: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.fn('NOW')
			},
			updated_at: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.fn('NOW')
			}
		});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('schedule_assigns');
	}
};

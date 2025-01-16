'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('attendances', {
			id: {
				type: Sequelize.UUID,
				primaryKey: true,
				defaultValue: Sequelize.UUIDV4,
				allowNull: false
			},
			date: {
				type: Sequelize.DATE,
				allowNull: false
			},
			student_id: {
				type: Sequelize.UUID,
				allowNull: false,
				references: {
					model: 'students', // The table name of the student model
					key: 'id'
				},
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE'
			},
			class_id: {
				type: Sequelize.UUID,
				allowNull: false,
				references: {
					model: 'classes', // The table name of the classes model
					key: 'id'
				},
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE'
			},
			attendance_reason_id: {
				type: Sequelize.UUID,
				allowNull: false,
				references: {
					model: 'attendance_reasons', // The table name of the attendance reason model
					key: 'id'
				},
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE'
			},
			attendance_type: {
				type: Sequelize.ENUM('absence', 'delayed', 'present'),
				defaultValue: 'absence'
			},
			time_of_delayed: {
				type: Sequelize.INTEGER,
				defaultValue: 0
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
		await queryInterface.dropTable('attendances');
	}
};

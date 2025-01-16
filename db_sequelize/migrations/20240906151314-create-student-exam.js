'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('student_exams', {
			id: {
				type: Sequelize.UUID,
				primaryKey: true,
				defaultValue: Sequelize.UUIDV4,
				allowNull: false
			},
			exam_id: {
				type: Sequelize.UUID,
				allowNull: false,
				references: {
					model: 'exams', // The table name of the Exam model
					key: 'id'
				},
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE'
			},
			points: {
				type: Sequelize.FLOAT,
				defaultValue: 0
			},
			class_id: {
				type: Sequelize.UUID,
				allowNull: false,
				references: {
					model: 'classes', // The table name of the Classes model
					key: 'id'
				},
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE'
			},
			student_id: {
				type: Sequelize.UUID,
				allowNull: false,
				references: {
					model: 'students', // The table name of the Student model
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
		await queryInterface.dropTable('student_exams');
	}
};

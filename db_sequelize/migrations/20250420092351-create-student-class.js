'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('student_class', {
			id: {
				type: Sequelize.UUID,
				primaryKey: true,
				defaultValue: Sequelize.UUIDV4,
				allowNull: false
			},
			class_id: {
				type: Sequelize.UUID,
				allowNull: false,
				references: {
					model: 'classes',
					key: 'id'
				},
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE'
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

		// Add a unique constraint to prevent duplicate associations
		await queryInterface.addConstraint('student_class', {
			fields: ['student_id', 'class_id'],
			type: 'unique',
			name: 'unique_student_class'
		});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('student_class');
	}
};

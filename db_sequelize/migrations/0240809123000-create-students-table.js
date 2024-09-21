'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('students', {
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
					model: 'classes', // This should match the table name of the classes model
					key: 'id'
				},
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE'
			},
			name: {
				type: Sequelize.STRING,
				allowNull: false
			},
			family: {
				type: Sequelize.STRING,
				allowNull: false
			},
			middle_name: {
				type: Sequelize.STRING,
				allowNull: true
			},
			email: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true
			},
			phone: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true
			},
			national_code: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true
			},
			student_status: {
				type: Sequelize.STRING,
				allowNull: true
			},
			birth_date: {
				type: Sequelize.DATE,
				allowNull: true
			},
			password: {
				type: Sequelize.STRING,
				allowNull: false
			},
			profile_picture: {
				type: Sequelize.STRING,
				allowNull: true
			},
			is_active: {
				type: Sequelize.BOOLEAN,
				defaultValue: true
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
		await queryInterface.dropTable('students');
	}
};

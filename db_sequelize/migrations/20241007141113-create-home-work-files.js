'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	up: async (queryInterface, Sequelize) => {
		// Step 1: Remove columns from home_works table
		await queryInterface.removeColumn('home_works', 'file');
		await queryInterface.removeColumn('home_works', 'file_type');

		// Step 2: Create home_work_files table
		await queryInterface.createTable('home_work_files', {
			id: {
				type: Sequelize.UUID,
				allowNull: false,
				primaryKey: true,
				defaultValue: Sequelize.UUIDV4
			},
			home_work_id: {
				type: Sequelize.UUID,
				allowNull: false,
				references: {
					model: 'home_works', // References the home_works table
					key: 'id'
				},
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE'
			},
			file: {
				type: Sequelize.STRING,
				allowNull: false
			},
			file_type: {
				type: Sequelize.STRING,
				allowNull: false
			},
			created_at: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.NOW
			},
			updated_at: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.NOW
			}
		});
	},

	down: async (queryInterface, Sequelize) => {
		// Step 1: Add columns back to home_works table
		await queryInterface.addColumn('home_works', 'file', {
			type: Sequelize.STRING,
			allowNull: true
		});
		await queryInterface.addColumn('home_works', 'file_type', {
			type: Sequelize.STRING,
			allowNull: true
		});

		// Step 2: Drop the home_work_files table
		await queryInterface.dropTable('home_work_files');
	}
};

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('home_works', {
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
			start_date: {
				type: Sequelize.DATE
			},
			end_date: {
				type: Sequelize.DATE
			},
			description: {
				type: Sequelize.STRING
			},
			file: {
				type: Sequelize.STRING
			},
			file_type: {
				type: Sequelize.STRING,
				allowNull: true
			},
			max_score: {
				type: Sequelize.INTEGER
			},
			min_score: {
				type: Sequelize.INTEGER
			},
			teacher_id: {
				type: Sequelize.UUID,
				allowNull: false
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
		await queryInterface.dropTable('home_works');
	}
};

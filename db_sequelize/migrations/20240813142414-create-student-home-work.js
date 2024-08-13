'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('student_home_works', {
			id: {
				type: Sequelize.UUID,
				primaryKey: true,
				defaultValue: Sequelize.UUIDV4,
				allowNull: false
			},
			class_home_work_id: {
				type: Sequelize.UUID,
				allowNull: true
			},
			home_work_id: {
				type: Sequelize.UUID,
				allowNull: false
			},
			student_id: {
				type: Sequelize.UUID,
				allowNull: false
			},
			status: {
				type: Sequelize.ENUM('done', 'later', 'not_send', 'pending', 'undone'),
				allowNull: false
			},
			score: {
				type: Sequelize.INTEGER
			},
			status_description: {
				type: Sequelize.STRING
			},
			status_time: {
				type: Sequelize.DATE
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
		await queryInterface.dropTable('student_home_works');
	}
};

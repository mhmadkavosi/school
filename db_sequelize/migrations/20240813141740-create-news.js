'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('news', {
			id: {
				type: Sequelize.UUID,
				primaryKey: true,
				defaultValue: Sequelize.UUIDV4,
				allowNull: false
			},
			school_id: {
				type: Sequelize.UUID,
				allowNull: false
			},
			title: {
				type: Sequelize.STRING,
				allowNull: false
			},
			news_category_id: {
				type: Sequelize.UUID,
				allowNull: false
			},
			description: {
				type: Sequelize.STRING,
				allowNull: false
			},
			file: {
				type: Sequelize.STRING,
				allowNull: true
			},
			priority: {
				type: Sequelize.INTEGER
			},
			views: {
				type: Sequelize.INTEGER,
				defaultValue: 0
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
		await queryInterface.dropTable('news');
	}
};

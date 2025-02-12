'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('notifications', {
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
			status: {
				type: Sequelize.ENUM('important', 'low', 'normal'),
				allowNull: false
			},
			type: {
				type: Sequelize.STRING,
				allowNull: false
			},
			details: {
				type: Sequelize.STRING,
				allowNull: true
			},
			created_at: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
			},
			updated_at: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
			}
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('notifications');
	}
};

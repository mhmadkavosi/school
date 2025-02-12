'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('notification_assigns', {
			id: {
				type: Sequelize.UUID,
				primaryKey: true,
				defaultValue: Sequelize.UUIDV4,
				allowNull: false
			},
			notification_id: {
				type: Sequelize.UUID,
				allowNull: false,
				references: {
					model: 'notifications',
					key: 'id'
				},
				onDelete: 'CASCADE'
			},
			assign_id: {
				type: Sequelize.UUID,
				allowNull: false
			},
			assign_type: {
				type: Sequelize.ENUM('class', 'student', 'teacher'),
				allowNull: false
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
		await queryInterface.dropTable('notification_assigns');
	}
};

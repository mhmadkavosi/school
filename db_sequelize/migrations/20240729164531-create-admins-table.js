'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('admins', {
			id: {
				type: Sequelize.UUID,
				primaryKey: true,
				defaultValue: Sequelize.UUIDV4
			},
			national_code: {
				type: Sequelize.STRING(10),
				allowNull: false,
				unique: true
			},
			email: {
				type: Sequelize.STRING(126),
				allowNull: false,
				unique: true
			},
			name: {
				type: Sequelize.STRING(128),
				allowNull: false
			},
			family: {
				type: Sequelize.STRING(128),
				allowNull: false
			},
			password: {
				type: Sequelize.STRING,
				allowNull: false
			},
			super_admin: {
				type: Sequelize.BOOLEAN,
				allowNull: true,
				defaultValue: false
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
		await queryInterface.dropTable('admins');
	}
};

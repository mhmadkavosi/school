'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('files', {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false
			},
			url: {
				type: Sequelize.STRING,
				unique: true,
				allowNull: false
			},
			bucket_name: {
				type: Sequelize.STRING,
				allowNull: false
			},
			user_id: {
				type: Sequelize.UUID,
				allowNull: true
			},
			file_key: {
				type: Sequelize.STRING,
				unique: true,
				allowNull: false
			},
			size: {
				type: Sequelize.STRING,
				allowNull: false
			},
			mim_type: {
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
		await queryInterface.dropTable('files');
	}
};

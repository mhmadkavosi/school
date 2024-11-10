'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('preparation_plans', {
			id: {
				type: Sequelize.UUID,
				primaryKey: true,
				defaultValue: Sequelize.UUIDV4,
				allowNull: false
			},
			week_number: {
				type: Sequelize.INTEGER,
				allowNull: false
			},
			field: {
				type: Sequelize.STRING,
				allowNull: false
			},
			basic_concept: {
				type: Sequelize.STRING,
				allowNull: false
			},
			subject: {
				type: Sequelize.STRING,
				allowNull: true
			},
			season: {
				type: Sequelize.STRING,
				allowNull: true
			},
			number_of_class: {
				type: Sequelize.INTEGER,
				allowNull: false
			},
			preparation_id: {
				type: Sequelize.UUID,
				allowNull: false,
				references: {
					model: 'preparation', // The table name of the Preparation model
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
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('preparation_plans');
	}
};

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('preparation', {
			id: {
				type: Sequelize.UUID,
				primaryKey: true,
				defaultValue: Sequelize.UUIDV4,
				allowNull: false
			},
			preparation_year_start: {
				type: Sequelize.STRING,
				allowNull: false
			},
			preparation_year_end: {
				type: Sequelize.STRING,
				allowNull: false
			},
			subject: {
				type: Sequelize.STRING,
				allowNull: false
			},
			class_level_id: {
				type: Sequelize.UUID,
				allowNull: false,
				references: {
					model: 'class_levels', // The table name of the ClassLevel model
					key: 'id'
				},
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE'
			},
			grade: {
				type: Sequelize.STRING,
				allowNull: false
			},
			semester: {
				type: Sequelize.STRING,
				allowNull: true
			},
			part: {
				type: Sequelize.STRING,
				allowNull: true
			},
			notes: {
				type: Sequelize.STRING,
				allowNull: true
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
		await queryInterface.dropTable('preparation');
	}
};

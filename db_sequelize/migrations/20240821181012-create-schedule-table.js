'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('schedules', {
			id: {
				type: Sequelize.UUID,
				primaryKey: true,
				defaultValue: Sequelize.UUIDV4
			},
			title: {
				type: Sequelize.STRING,
				allowNull: false
			},
			event_date: {
				type: Sequelize.DATE,
				allowNull: false
			},
			event_start_hour: {
				type: Sequelize.STRING,
				allowNull: true
			},
			event_end_hour: {
				type: Sequelize.STRING,
				allowNull: true
			},
			event_description: {
				type: Sequelize.TEXT,
				allowNull: true
			},
			event_category_id: {
				type: Sequelize.UUID,
				allowNull: true,
				references: {
					model: 'event_categories',
					key: 'id'
				},
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL'
			},
			event_type: {
				type: Sequelize.ENUM('private', 'public'),
				allowNull: false
			},
			school_id: {
				type: Sequelize.UUID,
				allowNull: false,
				references: {
					model: 'schools',
					key: 'id'
				},
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE'
			},
			teacher_id: {
				type: Sequelize.UUID,
				allowNull: false,
				references: {
					model: 'teachers',
					key: 'id'
				},
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE'
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
		await queryInterface.dropTable('schedules');
	}
};

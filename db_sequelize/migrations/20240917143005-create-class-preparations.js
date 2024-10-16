'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('class_preparations', {
			id: {
				type: Sequelize.UUID,
				primaryKey: true,
				defaultValue: Sequelize.UUIDV4,
				allowNull: false
			},
			date: {
				type: Sequelize.DATE,
				allowNull: false
			},
			preparation_id: {
				type: Sequelize.UUID,
				allowNull: false,
				references: {
					model: 'preparation', // The table name for the Teacher model
					key: 'id'
				},
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE'
			},
			knowledge_objectives: {
				type: Sequelize.STRING,
				allowNull: true
			},
			skill_objectives: {
				type: Sequelize.STRING,
				allowNull: true
			},
			emotional_objectives: {
				type: Sequelize.STRING,
				allowNull: true
			},
			teaching_aids: {
				type: Sequelize.STRING,
				allowNull: true
			},
			acquired_skills: {
				type: Sequelize.STRING,
				allowNull: true
			},
			present: {
				type: Sequelize.STRING,
				allowNull: true
			},
			apply: {
				type: Sequelize.STRING,
				allowNull: true
			},
			value_and_expand: {
				type: Sequelize.STRING,
				allowNull: true
			},
			teacher_id: {
				type: Sequelize.UUID,
				allowNull: false,
				references: {
					model: 'teachers', // The table name for the Teacher model
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
		await queryInterface.dropTable('class_preparations');
	}
};

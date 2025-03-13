'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('classes', {
			id: {
				type: Sequelize.UUID,
				primaryKey: true,
				defaultValue: Sequelize.UUIDV4,
				allowNull: false
			},
			school_id: {
				type: Sequelize.UUID,
				allowNull: false,
				references: {
					model: 'schools', // references the table name
					key: 'id'
				},
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE'
			},
			class_level_id: {
				type: Sequelize.UUID,
				allowNull: false,
				references: {
					model: 'class_levels', // references the table name
					key: 'id'
				},
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE'
			},
			count: {
				type: Sequelize.INTEGER,
				allowNull: false
			},
			link: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true
			},
			color: {
				type: Sequelize.STRING,
				unique: true
			},
			major: {
				type: Sequelize.UUID,
				unique: true
			},
			major_type: {
				type: Sequelize.STRING,
				unique: true
			},
			name: {
				type: Sequelize.STRING,
				allowNull: false
			},
			teacher_id: {
				type: Sequelize.UUID,
				allowNull: false,
				references: {
					model: 'teachers', // Assuming there's a `teachers` table
					key: 'id'
				},
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE'
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

	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('classes');
	}
};

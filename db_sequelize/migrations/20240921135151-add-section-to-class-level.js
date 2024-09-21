'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	up: async (queryInterface, Sequelize) => {
		// Adding new columns
		await queryInterface.addColumn('class_levels', 'section_id', {
			type: Sequelize.UUID,
			allowNull: true,
			references: {
				model: 'sections', // Assuming the table name for SectionModel is 'sections'
				key: 'id'
			},
			onUpdate: 'CASCADE',
			onDelete: 'SET NULL'
		});

		await queryInterface.addColumn('class_levels', 'level', {
			type: Sequelize.INTEGER,
			allowNull: true
		});
	},

	down: async (queryInterface, Sequelize) => {
		// Removing the added columns
		await queryInterface.removeColumn('class_levels', 'section_id');
		await queryInterface.removeColumn('class_levels', 'level');
	}
};

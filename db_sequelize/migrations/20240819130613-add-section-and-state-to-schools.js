'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	up: async (queryInterface, Sequelize) => {
		// Add section_id column
		await queryInterface.addColumn('schools', 'section_id', {
			type: Sequelize.UUID,
			allowNull: true,
			references: {
				model: 'sections', // Ensure this matches the actual table name for SectionModel
				key: 'id'
			},
			onUpdate: 'CASCADE',
			onDelete: 'RESTRICT'
		});

		// Add state_id column
		await queryInterface.addColumn('schools', 'state_id', {
			type: Sequelize.UUID,
			allowNull: true,
			references: {
				model: 'states', // Ensure this matches the actual table name for StateModel
				key: 'id'
			},
			onUpdate: 'CASCADE',
			onDelete: 'RESTRICT'
		});
	},

	down: async (queryInterface, Sequelize) => {
		// Remove section_id column
		await queryInterface.removeColumn('schools', 'section_id');

		// Remove state_id column
		await queryInterface.removeColumn('schools', 'state_id');
	}
};

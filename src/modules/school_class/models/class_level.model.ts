import { DataTypes } from 'sequelize';
import DB from '../../../config/sequelize.config';
import SectionModel from '../../school/models/section.model';

const ClassLevelModel = DB.instance().define(
	'class_level',
	{
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		section_id: {
			type: DataTypes.UUID,
			allowNull: true
		},
		level: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		is_active: {
			type: DataTypes.BOOLEAN,
			defaultValue: true
		}
	},
	{
		tableName: 'class_levels'
	}
);

ClassLevelModel.hasOne(SectionModel, {
	sourceKey: 'section_id',
	foreignKey: 'id'
});

export default ClassLevelModel;

import { DataTypes } from 'sequelize';
import DB from '../../../config/sequelize.config';
import ClassLevelModel from '../../school_class/models/class_level.model';

const PreparationModel = DB.instance().define(
	'preparation',
	{
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4
		},
		preparation_year_start: {
			type: DataTypes.STRING,
			allowNull: false
		},
		preparation_year_end: {
			type: DataTypes.STRING,
			allowNull: false
		},
		subject: {
			type: DataTypes.STRING,
			allowNull: false
		},
		class_level_id: {
			type: DataTypes.UUID,
			allowNull: false
		},
		grade: {
			type: DataTypes.STRING,
			allowNull: false
		},
		semester: {
			type: DataTypes.STRING,
			allowNull: true
		},
		part: {
			type: DataTypes.STRING,
			allowNull: true
		},
		notes: {
			type: DataTypes.STRING,
			allowNull: true
		},
		season: {
			type: DataTypes.STRING,
			allowNull: true
		}
	},
	{
		tableName: 'preparation'
	}
);

PreparationModel.hasOne(ClassLevelModel, {
	sourceKey: 'class_level_id',
	foreignKey: 'id'
});

export default PreparationModel;

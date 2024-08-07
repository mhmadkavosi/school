import { DataTypes } from 'sequelize';
import DB from '../../../config/sequelize.config';

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
		is_active: {
			type: DataTypes.BOOLEAN,
			defaultValue: true
		}
	},
	{
		tableName: 'class_levels'
	}
);

export default ClassLevelModel;

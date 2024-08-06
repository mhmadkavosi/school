import { DataTypes } from 'sequelize';
import DB from '../../../config/sequelize.config';

const MajorModel = DB.instance().define(
	'major',
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
		tableName: 'majors'
	}
);

export default MajorModel;

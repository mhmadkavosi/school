import { DataTypes } from 'sequelize';
import DB from '../../../config/sequelize.config';
import { SexEnum } from './enums/sex.enum';

const SchoolModel = DB.instance().define(
	'school',
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
		sex: {
			type: DataTypes.ENUM(SexEnum.f, SexEnum.m)
		},
		is_active: {
			type: DataTypes.BOOLEAN,
			defaultValue: true
		}
	},
	{
		tableName: 'schools'
	}
);

export default SchoolModel;

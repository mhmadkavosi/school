import { DataTypes } from 'sequelize';
import DB from '../../../config/sequelize.config';

const AttendanceReasonModel = DB.instance().define(
	'attendance_reason',
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
		tableName: 'attendance_reasons'
	}
);

export default AttendanceReasonModel;

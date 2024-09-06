import { DataTypes } from 'sequelize';
import DB from '../../../config/sequelize.config';
import { AttendanceTypeEnum } from './enums/attendance_type.enum';
import ClassesModel from '../../school_class/models/classes.model';
import StudentModel from '../../student/models/student.model';
import AttendanceReasonModel from './attendance_reason.model';

const AttendanceModel = DB.instance().define(
	'attendance',
	{
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4
		},
		date: {
			type: DataTypes.DATE,
			allowNull: false
		},
		student_id: {
			type: DataTypes.UUID,
			allowNull: false
		},
		class_id: {
			type: DataTypes.UUID,
			allowNull: false
		},
		attendance_reason_id: {
			type: DataTypes.UUID,
			allowNull: false
		},
		attendance_type: {
			type: DataTypes.ENUM(
				AttendanceTypeEnum.absence,
				AttendanceTypeEnum.delayed,
				AttendanceTypeEnum.present
			),
			defaultValue: AttendanceTypeEnum.absence
		},
		time_of_delayed: {
			type: DataTypes.INTEGER,
			defaultValue: 0
		}
	},
	{
		tableName: 'attendances'
	}
);
AttendanceModel.hasOne(ClassesModel, {
	foreignKey: 'id',
	sourceKey: 'class_id'
});
AttendanceModel.hasOne(StudentModel, {
	foreignKey: 'id',
	sourceKey: 'student_id'
});
AttendanceModel.hasOne(AttendanceReasonModel, {
	foreignKey: 'id',
	sourceKey: 'attendance_reason_id'
});

export default AttendanceModel;

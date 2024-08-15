import { DataTypes } from 'sequelize';
import DB from '../../../config/sequelize.config';
import HomeWorkModel from './home_work.model';
import ClassHomeWorkModel from './class_home_work.model';
import StudentModel from '../../student/models/student.model';
import { StudentHomeWorkStatusEnum } from './enums/student_home_work.enum';

const StudentHomeWorkModel = DB.instance().define(
	'student_home_work',
	{
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4
		},
		class_home_work_id: {
			type: DataTypes.UUID,
			allowNull: true
		},
		home_work_id: {
			type: DataTypes.UUID,
			allowNull: false
		},
		student_id: {
			type: DataTypes.UUID,
			allowNull: false
		},
		status: {
			type: DataTypes.ENUM(
				StudentHomeWorkStatusEnum.done,
				StudentHomeWorkStatusEnum.later,
				StudentHomeWorkStatusEnum.not_send,
				StudentHomeWorkStatusEnum.pending,
				StudentHomeWorkStatusEnum.undone
			),
			allowNull: false
		},
		score: {
			type: DataTypes.INTEGER
		},
		status_description: {
			type: DataTypes.STRING
		},
		status_time: {
			type: DataTypes.DATE
		}
	},
	{
		tableName: 'student_home_works'
	}
);

StudentHomeWorkModel.hasOne(ClassHomeWorkModel, {
	sourceKey: 'class_home_work_id',
	foreignKey: 'id'
});
StudentHomeWorkModel.hasOne(HomeWorkModel, {
	sourceKey: 'home_work_id',
	foreignKey: 'id'
});

HomeWorkModel.hasMany(StudentHomeWorkModel, {
	sourceKey: 'id',
	foreignKey: 'home_work_id'
});

StudentHomeWorkModel.hasOne(StudentModel, {
	sourceKey: 'student_id',
	foreignKey: 'id'
});

export default StudentHomeWorkModel;

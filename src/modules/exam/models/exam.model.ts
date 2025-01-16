import { DataTypes } from 'sequelize';
import DB from '../../../config/sequelize.config';
import { ExamTypeEnum } from './enums/exam_type.enum';
import TeacherModel from '../../teacher/models/teacher.model';

const ExamModel = DB.instance().define(
	'exam',
	{
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false
		},
		date: {
			type: DataTypes.DATE,
			allowNull: false
		},
		start_hour: {
			type: DataTypes.STRING,
			allowNull: true
		},
		end_hour: {
			type: DataTypes.STRING,
			allowNull: true
		},
		description: {
			type: DataTypes.STRING,
			allowNull: true
		},
		type: {
			type: DataTypes.ENUM(ExamTypeEnum.important),
			allowNull: true
		},
		color: {
			type: DataTypes.STRING,
			allowNull: true
		},
		teacher_id: {
			type: DataTypes.UUID,
			allowNull: false
		}
	},
	{
		tableName: 'exams'
	}
);

ExamModel.hasOne(TeacherModel, {
	sourceKey: 'teacher_id',
	foreignKey: 'id'
});

export default ExamModel;

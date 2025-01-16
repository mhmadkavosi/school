import { DataTypes } from 'sequelize';
import DB from '../../../config/sequelize.config';
import ExamModel from './exam.model';
import StudentModel from '../../student/models/student.model';
import ClassesModel from '../../school_class/models/classes.model';

const StudentExamModel = DB.instance().define(
	'student_exams',
	{
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4
		},
		exam_id: {
			type: DataTypes.UUID,
			allowNull: false
		},
		points: {
			type: DataTypes.FLOAT,
			defaultValue: 0
		},
		class_id: {
			type: DataTypes.UUID,
			allowNull: false
		},
		student_id: {
			type: DataTypes.UUID,
			allowNull: false
		}
	},
	{
		tableName: 'student_exams'
	}
);

StudentExamModel.hasOne(ExamModel, {
	sourceKey: 'exam_id',
	foreignKey: 'id'
});

ExamModel.hasMany(StudentExamModel, {
	sourceKey: 'id',
	foreignKey: 'exam_id'
});

StudentExamModel.hasOne(StudentModel, {
	sourceKey: 'student_id',
	foreignKey: 'id'
});

StudentModel.hasMany(StudentExamModel, {
	sourceKey: 'id',
	foreignKey: 'student_id'
});

StudentExamModel.hasOne(ClassesModel, {
	sourceKey: 'class_id',
	foreignKey: 'id'
});

export default StudentExamModel;

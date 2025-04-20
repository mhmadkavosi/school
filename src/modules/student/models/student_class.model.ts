import { DataTypes } from 'sequelize';
import DB from '../../../config/sequelize.config';
import ClassesModel from '../../school_class/models/classes.model';
import StudentModel from './student.model';

const StudentClassesModel = DB.instance().define(
	'student_class',
	{
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4
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
		tableName: 'student_class'
	}
);

StudentClassesModel.hasMany(ClassesModel, {
	sourceKey: 'class_id',
	foreignKey: 'id'
});

StudentClassesModel.hasOne(StudentModel, {
	sourceKey: 'student_id',
	foreignKey: 'id'
});

StudentModel.hasMany(StudentClassesModel, {
	sourceKey: 'id',
	foreignKey: 'student_id'
});

ClassesModel.hasMany(StudentClassesModel, {
	sourceKey: 'id',
	foreignKey: 'class_id'
});

export default StudentClassesModel;

import { DataTypes } from 'sequelize';
import DB from '../../../config/sequelize.config';
import ClassLevelModel from './class_level.model';
import SchoolModel from '../../school/models/school.model';
import TeacherModel from '../../teacher/models/teacher.model';

const ClassesModel = DB.instance().define(
	'class',
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
		school_id: {
			type: DataTypes.UUID,
			allowNull: false
		},
		class_level_id: {
			type: DataTypes.UUID,
			allowNull: false
		},
		count: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		link: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		teacher_id: {
			type: DataTypes.UUID,
			allowNull: false
		},
		color: {
			type: DataTypes.STRING,
			unique: true
		}
	},
	{
		tableName: 'classes'
	}
);

ClassesModel.hasOne(SchoolModel, {
	foreignKey: 'id',
	sourceKey: 'school_id'
});

ClassesModel.hasOne(ClassLevelModel, {
	foreignKey: 'id',
	sourceKey: 'class_level_id'
});

ClassesModel.hasOne(TeacherModel, {
	foreignKey: 'id',
	sourceKey: 'teacher_id'
});

export default ClassesModel;

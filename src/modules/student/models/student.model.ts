import { DataTypes } from 'sequelize';
import DB from '../../../config/sequelize.config';
import SchoolModel from '../../school/models/school.model';

const StudentModel = DB.instance().define(
	'student',
	{
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4
		},
		school_id: {
			type: DataTypes.UUID,
			allowNull: false
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		family: {
			type: DataTypes.STRING,
			allowNull: false
		},
		middle_name: {
			type: DataTypes.STRING,
			allowNull: true
		},
		email: {
			type: DataTypes.STRING,
			allowNull: true,
			unique: true
		},
		phone: {
			type: DataTypes.STRING,
			allowNull: true,
			unique: true
		},
		national_code: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		student_status: {
			type: DataTypes.STRING,
			allowNull: true
		},
		birth_date: {
			type: DataTypes.DATE,
			allowNull: true
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false
		},
		profile_picture: {
			type: DataTypes.STRING,
			allowNull: true
		},
		is_active: {
			type: DataTypes.BOOLEAN,
			defaultValue: true
		}
	},
	{
		tableName: 'students'
	}
);
StudentModel.hasOne(SchoolModel, {
	foreignKey: 'id',
	sourceKey: 'school_id'
});

SchoolModel.hasMany(StudentModel, {
	foreignKey: 'school_id',
	sourceKey: 'id'
});

export default StudentModel;

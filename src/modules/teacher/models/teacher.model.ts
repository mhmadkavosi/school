import { DataTypes } from 'sequelize';
import DB from '../../../config/sequelize.config';
import MajorModel from '../../school_class/models/major.model';
import SchoolModel from '../../school/models/school.model';

const TeacherModel = DB.instance().define(
	'Teacher',
	{
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4
		},
		name: {
			type: DataTypes.STRING(128),
			allowNull: false
		},
		family: {
			type: DataTypes.STRING(128),
			allowNull: false
		},
		email: {
			type: DataTypes.STRING(126),
			allowNull: false,
			unique: true
		},
		password: {
			type: DataTypes.STRING,
			allowNull: true
		},
		phone_number: {
			type: DataTypes.STRING(11),
			allowNull: true,
			unique: true
		},
		about: {
			type: DataTypes.STRING(256),
			allowNull: true
		},
		school_id: {
			type: DataTypes.UUID,
			allowNull: true
		},
		profile_picture: {
			type: DataTypes.STRING,
			allowNull: true
		},
		major_id: {
			type: DataTypes.UUID,
			allowNull: true
		},
		is_active: {
			type: DataTypes.BOOLEAN,
			defaultValue: true
		}
	},
	{
		tableName: 'teachers'
	}
);

TeacherModel.hasOne(SchoolModel, {
	foreignKey: 'id',
	sourceKey: 'school_id'
});
TeacherModel.hasOne(MajorModel, {
	foreignKey: 'id',
	sourceKey: 'major_id'
});

export default TeacherModel;

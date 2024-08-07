import { DataTypes } from 'sequelize';
import DB from '../../../config/sequelize.config';
import MajorModel from './major.model';
import ClassLevelModel from './class_level.model';
import SchoolModel from '../../school/models/school.model';

const ClassesModel = DB.instance().define(
	'class',
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
		major_id: {
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

ClassesModel.hasOne(MajorModel, {
	foreignKey: 'id',
	sourceKey: 'major_id'
});

ClassesModel.hasOne(ClassLevelModel, {
	foreignKey: 'id',
	sourceKey: 'class_level_id'
});

export default ClassesModel;

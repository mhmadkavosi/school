import { DataTypes } from 'sequelize';
import DB from '../../../config/sequelize.config';
import { SexEnum } from './enums/sex.enum';
import SectionModel from './section.model';
import StateModel from './state.model';
import ClassesModel from '../../school_class/models/classes.model';

const SchoolModel = DB.instance().define(
	'school',
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
		sex: {
			type: DataTypes.ENUM(SexEnum.f, SexEnum.m)
		},
		section_id: {
			type: DataTypes.UUID,
			allowNull: true
		},
		state_id: {
			type: DataTypes.UUID,
			allowNull: true
		},
		is_active: {
			type: DataTypes.BOOLEAN,
			defaultValue: true
		}
	},
	{
		tableName: 'schools'
	}
);

SchoolModel.hasOne(SectionModel, {
	sourceKey: 'section_id',
	foreignKey: 'id'
});

SchoolModel.hasOne(StateModel, {
	sourceKey: 'state_id',
	foreignKey: 'id'
});

SchoolModel.hasMany(ClassesModel, {
	foreignKey: 'school_id',
	sourceKey: 'id',
	as: 'classes'
});

export default SchoolModel;

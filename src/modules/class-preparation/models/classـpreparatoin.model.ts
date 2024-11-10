import { DataTypes } from 'sequelize';
import DB from '../../../config/sequelize.config';
import TeacherModel from '../../teacher/models/teacher.model';
import PreparationModel from './preparation.model';

const ClassPreparationModel = DB.instance().define(
	'class_preparation',
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
		preparation_id: {
			type: DataTypes.UUID,
			allowNull: false
		},
		knowledge_objectives: {
			type: DataTypes.STRING,
			allowNull: true
		},
		skill_objectives: {
			type: DataTypes.STRING,
			allowNull: true
		},
		emotional_objectives: {
			type: DataTypes.STRING,
			allowNull: true
		},
		teaching_aids: {
			type: DataTypes.STRING,
			allowNull: true
		},
		acquired_skills: {
			type: DataTypes.STRING,
			allowNull: true
		},
		present: {
			type: DataTypes.STRING,
			allowNull: true
		},
		apply: {
			type: DataTypes.STRING,
			allowNull: true
		},
		value_and_expand: {
			type: DataTypes.STRING,
			allowNull: true
		},
		teacher_id: {
			type: DataTypes.UUID,
			allowNull: false
		},
		is_confirm: {
			type: DataTypes.BOOLEAN,
			defaultValue: false
		}
	},
	{
		tableName: 'class_preparations'
	}
);

ClassPreparationModel.hasOne(TeacherModel, {
	sourceKey: 'teacher_id',
	foreignKey: 'id'
});

ClassPreparationModel.hasOne(PreparationModel, {
	sourceKey: 'preparation_id',
	foreignKey: 'id'
});

export default ClassPreparationModel;

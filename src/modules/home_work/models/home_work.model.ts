import { DataTypes } from 'sequelize';
import DB from '../../../config/sequelize.config';
import TeacherModel from '../../teacher/models/teacher.model';

const HomeWorkModel = DB.instance().define(
	'home_work',
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
		start_date: {
			type: DataTypes.DATE
		},
		end_date: {
			type: DataTypes.DATE
		},
		description: {
			type: DataTypes.STRING
		},
		file: {
			type: DataTypes.STRING,
			allowNull: true
		},
		file_type: {
			type: DataTypes.STRING,
			allowNull: true
		},
		max_score: {
			type: DataTypes.INTEGER
		},
		min_score: {
			type: DataTypes.INTEGER
		},
		teacher_id: {
			type: DataTypes.UUID,
			allowNull: false
		}
	},
	{
		tableName: 'home_works'
	}
);

HomeWorkModel.hasOne(TeacherModel, {
	sourceKey: 'teacher_id',
	foreignKey: 'id'
});

export default HomeWorkModel;

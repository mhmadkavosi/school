import { DataTypes } from 'sequelize';
import DB from '../../../config/sequelize.config';
import TeacherModel from '../../teacher/models/teacher.model';

const TeacherTokenModel = DB.instance().define(
	'TeacherToken',
	{
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4
		},
		teacher_id: {
			type: DataTypes.UUID,
			allowNull: false
		},
		ip: {
			type: DataTypes.STRING,
			allowNull: false
		},
		platform: {
			type: DataTypes.ENUM('Web', 'Mobile', 'Desktop'),
			allowNull: false
		},
		device_name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		os: {
			type: DataTypes.STRING,
			allowNull: false
		},
		user_agent: {
			type: DataTypes.STRING,
			allowNull: false
		},
		token_id: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		last_activity: {
			type: DataTypes.DATE,
			allowNull: true
		},
		api_version: {
			type: DataTypes.STRING,
			allowNull: false
		},
		expire_at: {
			type: DataTypes.DATE,
			defaultValue: DB.instance().literal('CURRENT_TIMESTAMP + INTERVAL 10 DAY')
		}
	},
	{
		indexes: [
			{
				fields: ['teacher_id', 'token_id']
			}
		],
		tableName: 'teacher_tokens'
	}
);

TeacherTokenModel.hasOne(TeacherModel, {
	foreignKey: 'id',
	sourceKey: 'teacher_id'
});

export default TeacherTokenModel;

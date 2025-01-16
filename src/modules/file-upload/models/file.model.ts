import { DataTypes } from 'sequelize';
import DB from '../../../config/sequelize.config';

const FileModel = DB.instance().define(
	'File',
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		url: {
			type: DataTypes.STRING(),
			unique: true,
			allowNull: false
		},
		bucket_name: {
			type: DataTypes.STRING(),
			allowNull: false
		},
		user_id: {
			type: DataTypes.UUID,
			allowNull: true
		},
		file_key: {
			type: DataTypes.STRING(),
			unique: true,
			allowNull: false
		},
		size: {
			type: DataTypes.STRING(),
			allowNull: false
		},
		mim_type: {
			type: DataTypes.STRING(),
			allowNull: false
		}
	},
	{
		tableName: 'files'
	}
);

export default FileModel;

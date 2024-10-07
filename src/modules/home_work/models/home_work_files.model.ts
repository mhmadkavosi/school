import { DataTypes } from 'sequelize';
import DB from '../../../config/sequelize.config';
import HomeWorkModel from './home_work.model';

const HomeWorkFilesModel = DB.instance().define(
	'home_work_file',
	{
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4
		},
		home_work_id: {
			type: DataTypes.UUID,
			allowNull: false
		},
		file: {
			type: DataTypes.STRING,
			allowNull: false
		},
		file_type: {
			type: DataTypes.STRING,
			allowNull: false
		}
	},
	{
		tableName: 'home_work_files'
	}
);

HomeWorkModel.hasMany(HomeWorkFilesModel, {
	sourceKey: 'id',
	foreignKey: 'home_work_id'
});

HomeWorkFilesModel.hasOne(HomeWorkModel, {
	sourceKey: 'home_work_id',
	foreignKey: 'id'
});

export default HomeWorkFilesModel;

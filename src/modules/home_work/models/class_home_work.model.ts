import { DataTypes } from 'sequelize';
import DB from '../../../config/sequelize.config';
import ClassesModel from '../../school_class/models/classes.model';
import HomeWorkModel from './home_work.model';

const ClassHomeWorkModel = DB.instance().define(
	'class_home_work',
	{
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4
		},
		class_id: {
			type: DataTypes.UUID,
			allowNull: false
		},
		home_work_id: {
			type: DataTypes.UUID,
			allowNull: false
		}
	},
	{
		tableName: 'class_home_works'
	}
);

ClassHomeWorkModel.hasMany(ClassesModel, {
	sourceKey: 'class_id',
	foreignKey: 'id'
});

ClassHomeWorkModel.hasOne(HomeWorkModel, {
	sourceKey: 'home_work_id',
	foreignKey: 'id'
});

export default ClassHomeWorkModel;

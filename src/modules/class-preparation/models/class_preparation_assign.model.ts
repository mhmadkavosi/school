import { DataTypes } from 'sequelize';
import DB from '../../../config/sequelize.config';
import ClassesModel from '../../school_class/models/classes.model';
import ClassPreparationModel from './classـpreparatoin.model';

const ClassPreparationAssignModel = DB.instance().define(
	'class_preparation_assign',
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
		class_preparation_id: {
			type: DataTypes.UUID,
			allowNull: false
		}
	},
	{
		tableName: 'class_preparation_assigns'
	}
);

ClassPreparationAssignModel.hasMany(ClassesModel, {
	sourceKey: 'class_id',
	foreignKey: 'id'
});
ClassPreparationAssignModel.hasOne(ClassPreparationModel, {
	sourceKey: 'class_preparation_id',
	foreignKey: 'id'
});

export default ClassPreparationAssignModel;

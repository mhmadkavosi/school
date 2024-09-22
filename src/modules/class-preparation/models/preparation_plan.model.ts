import { DataTypes } from 'sequelize';
import DB from '../../../config/sequelize.config';
import PreparationModel from './preparation.model';

const PreparationPlanModel = DB.instance().define(
	'preparation_plan',
	{
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4
		},
		week_number: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		field: {
			type: DataTypes.STRING,
			allowNull: false
		},
		basic_concept: {
			type: DataTypes.STRING,
			allowNull: false
		},
		number_of_class: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		preparation_id: {
			type: DataTypes.UUID,
			allowNull: false
		}
	},
	{
		tableName: 'preparation_plans'
	}
);

PreparationPlanModel.hasOne(PreparationModel, {
	sourceKey: 'preparation_id',
	foreignKey: 'id'
});

PreparationModel.hasMany(PreparationPlanModel, {
	sourceKey: 'id',
	foreignKey: 'preparation_id'
});

export default PreparationPlanModel;

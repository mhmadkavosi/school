import { DataTypes } from 'sequelize';
import DB from '../../../config/sequelize.config';

const EventCategoryModel = DB.instance().define(
	'event_category',
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
		color: {
			type: DataTypes.STRING,
			allowNull: true
		},

		is_active: {
			type: DataTypes.BOOLEAN,
			defaultValue: true
		}
	},
	{
		tableName: 'event_categories'
	}
);

export default EventCategoryModel;

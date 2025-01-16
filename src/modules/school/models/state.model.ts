import { DataTypes } from 'sequelize';
import DB from '../../../config/sequelize.config';

const StateModel = DB.instance().define(
	'state',
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
		is_active: {
			type: DataTypes.BOOLEAN,
			defaultValue: true
		}
	},
	{
		tableName: 'states'
	}
);

export default StateModel;

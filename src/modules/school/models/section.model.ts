import { DataTypes } from 'sequelize';
import DB from '../../../config/sequelize.config';

const SectionModel = DB.instance().define(
	'section',
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
		tableName: 'sections'
	}
);

export default SectionModel;

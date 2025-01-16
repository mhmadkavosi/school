import { DataTypes } from 'sequelize';
import DB from '../../../config/sequelize.config';

const NewsCategoryModel = DB.instance().define(
	'news_category',
	{
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		is_active: {
			type: DataTypes.BOOLEAN,
			defaultValue: true
		}
	},
	{
		tableName: 'news_categories'
	}
);

export default NewsCategoryModel;

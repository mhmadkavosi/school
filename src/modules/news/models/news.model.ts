import { DataTypes } from 'sequelize';
import DB from '../../../config/sequelize.config';
import SchoolModel from '../../school/models/school.model';
import NewsCategoryModel from './news_category.model';

const NewsModel = DB.instance().define(
	'news',
	{
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4
		},
		school_id: {
			type: DataTypes.UUID,
			allowNull: false
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false
		},
		news_category_id: {
			type: DataTypes.UUID,
			allowNull: false
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		file: {
			type: DataTypes.STRING,
			allowNull: true
		},
		priority: {
			type: DataTypes.INTEGER
		},
		views: {
			type: DataTypes.INTEGER,
			defaultValue: 0
		}
	},
	{
		tableName: 'news'
	}
);

NewsModel.hasOne(SchoolModel, {
	sourceKey: 'school_id',
	foreignKey: 'id'
});

NewsModel.hasOne(NewsCategoryModel, {
	sourceKey: 'news_category_id',
	foreignKey: 'id'
});

export default NewsModel;

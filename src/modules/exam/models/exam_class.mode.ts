import { DataTypes } from 'sequelize';
import DB from '../../../config/sequelize.config';
import ClassesModel from '../../school_class/models/classes.model';
import ExamModel from './exam.model';

const ExamClassModel = DB.instance().define(
	'exam_class',
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
		exam_id: {
			type: DataTypes.UUID,
			allowNull: false
		}
	},
	{
		tableName: 'exam_classes'
	}
);

ExamClassModel.hasMany(ClassesModel, {
	sourceKey: 'class_id',
	foreignKey: 'id'
});
ExamClassModel.hasOne(ExamModel, {
	sourceKey: 'exam_id',
	foreignKey: 'id'
});

export default ExamClassModel;

import { DataTypes } from 'sequelize';
import DB from '../../../config/sequelize.config';
import { WeekDays } from './enums/week_days.enum';
import ClassesModel from './classes.model';

const ClassTimingModel = DB.instance().define(
	'class_timing',
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
		day: {
			type: DataTypes.ENUM(
				WeekDays.friday,
				WeekDays.monday,
				WeekDays.saturday,
				WeekDays.sunday,
				WeekDays.thursday,
				WeekDays.tuesday,
				WeekDays.wednesday
			),
			allowNull: false
		},
		start_hour: {
			type: DataTypes.STRING,
			allowNull: false
		},
		end_hour: {
			type: DataTypes.STRING,
			allowNull: false
		}
	},
	{
		tableName: 'class_timings'
	}
);

ClassesModel.hasMany(ClassTimingModel, {
	sourceKey: 'id',
	foreignKey: 'class_id'
});

export default ClassTimingModel;

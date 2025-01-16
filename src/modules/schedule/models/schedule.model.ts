import { DataTypes } from 'sequelize';
import DB from '../../../config/sequelize.config';
import { EventTypes } from './enums/event_type.enum';
import EventCategory from './event_category.model';
import SchoolModel from '../../school/models/school.model';
import TeacherModel from '../../teacher/models/teacher.model';
import ScheduleAssignModel from './schedule_assign.model';

const ScheduleModel = DB.instance().define(
	'schedule',
	{
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false
		},
		event_date: {
			type: DataTypes.DATE,
			allowNull: false
		},
		event_start_hour: {
			type: DataTypes.STRING,
			allowNull: true
		},
		event_end_hour: {
			type: DataTypes.STRING,
			allowNull: true
		},
		event_description: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		event_category_id: {
			type: DataTypes.UUID,
			allowNull: true
		},
		event_type: {
			type: DataTypes.ENUM(EventTypes.private, EventTypes.public),
			allowNull: false
		},
		school_id: {
			type: DataTypes.UUID,
			allowNull: false
		},
		teacher_id: {
			type: DataTypes.UUID,
			allowNull: false
		}
	},
	{
		tableName: 'schedules'
	}
);

ScheduleModel.hasOne(EventCategory, {
	sourceKey: 'event_category_id',
	foreignKey: 'id'
});

ScheduleModel.hasOne(SchoolModel, {
	sourceKey: 'school_id',
	foreignKey: 'id'
});

ScheduleModel.hasOne(TeacherModel, {
	sourceKey: 'teacher_id',
	foreignKey: 'id'
});

ScheduleModel.hasMany(ScheduleAssignModel, {
	foreignKey: 'schedule_id'
});

export default ScheduleModel;

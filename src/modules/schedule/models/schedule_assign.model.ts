import { DataTypes } from 'sequelize';
import DB from '../../../config/sequelize.config';
import { AssignToTargetEnum } from './enums/assign_to_target.enum';

const ScheduleAssignModel = DB.instance().define(
	'schedule_assign',
	{
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4
		},
		assign_to: {
			type: DataTypes.UUID,
			allowNull: false
		},
		assign_to_target: {
			type: DataTypes.ENUM(AssignToTargetEnum.class, AssignToTargetEnum.student),
			allowNull: false
		},
		schedule_id: {
			type: DataTypes.UUID,
			allowNull: false
		}
	},
	{
		tableName: 'schedule_assigns'
	}
);

export default ScheduleAssignModel;

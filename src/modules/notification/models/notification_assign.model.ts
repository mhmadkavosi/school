import { DataTypes } from 'sequelize';
import DB from '../../../config/sequelize.config';
import { NotificationAssignTypeEnum } from './enums/notification_assign_type.enum';

const NotificationAssignModel = DB.instance().define(
	'notification_assign',
	{
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4
		},
		notification_id: {
			type: DataTypes.UUID,
			allowNull: false
		},
		assign_id: {
			type: DataTypes.UUID,
			allowNull: false
		},
		assign_type: {
			type: DataTypes.ENUM(
				NotificationAssignTypeEnum.class,
				NotificationAssignTypeEnum.student,
				NotificationAssignTypeEnum.teacher
			),
			allowNull: false
		}
	},
	{
		tableName: 'notification_assigns'
	}
);

export default NotificationAssignModel;

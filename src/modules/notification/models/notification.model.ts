import { DataTypes } from 'sequelize';
import DB from '../../../config/sequelize.config';
import { NotificationStatusEnum } from './enums/notification_status.enum';
import NotificationAssignModel from './notification_assign.model';

const NotificationModel = DB.instance().define(
	'notification',
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
		status: {
			type: DataTypes.ENUM(
				NotificationStatusEnum.important,
				NotificationStatusEnum.low,
				NotificationStatusEnum.normal
			),
			allowNull: false
		},
		type: {
			type: DataTypes.STRING,
			allowNull: false
		},
		details: {
			type: DataTypes.STRING,
			allowNull: true
		}
	},
	{
		tableName: 'notifications'
	}
);
NotificationModel.hasMany(NotificationAssignModel, {
	foreignKey: 'notification_id',
	sourceKey: 'id'
});

export default NotificationModel;

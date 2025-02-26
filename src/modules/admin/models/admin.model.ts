import { DataTypes } from 'sequelize';
import DB from '../../../config/sequelize.config';
const AdminModel = DB.instance().define(
	'Admin',
	{
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4
		},

		email: {
			type: DataTypes.STRING(126),
			allowNull: false,
			unique: true
		},
		name: {
			type: DataTypes.STRING(128),
			allowNull: false
		},
		family: {
			type: DataTypes.STRING(128),
			allowNull: false
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false
		},
		super_admin: {
			type: DataTypes.BOOLEAN,
			allowNull: true,
			defaultValue: false
		},
		about_me: {
			type: DataTypes.STRING(256),
			allowNull: true
		},
		profile_picture: {
			type: DataTypes.STRING,
			allowNull: true
		},
		is_active: {
			type: DataTypes.BOOLEAN,
			defaultValue: true
		}
	},
	{
		tableName: 'admins'
	}
);

export default AdminModel;

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
		national_code: {
			type: DataTypes.STRING(10),
			allowNull: false,
			unique: true
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

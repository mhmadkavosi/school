import { AppLogger } from '../lib/logger/Logger';
import { Sequelize } from 'sequelize';
import { config } from 'dotenv';

config();

class DB {
	private static _instance: Sequelize;

	private constructor() {
		try {
			DB._instance = new Sequelize(`${process.env.POSTGRES_URL}/${process.env.POSTGRES_DB}`, {
				dialect: 'postgres',
				omitNull: true,
				logging: process.env.NODE_ENV === 'production' ? false : (msg: any) => AppLogger.debug(msg),
				dialectOptions: {
					keepAlive: true,
					ssl: {
						rejectUnauthorized: false
					}
				},
				define: {
					underscored: true,
					updatedAt: 'updated_at',
					createdAt: 'created_at',
					deletedAt: 'deleted_at'
				},
				retry: {
					max: 5,
					timeout: 3000,
					match: ['SequelizeConnectionError', 'ETIMEDOUT', /Deadlock/i]
				},
				pool: {
					max: 10,
					min: 2
				}
			});
			AppLogger.info('db postgres connected');
		} catch (e) {
			AppLogger.error('error in  postgres connect', e);
		}
	}

	public static instance(): Sequelize {
		if (!DB._instance) {
			new DB();
		}

		return DB._instance;
	}
}

export default DB;

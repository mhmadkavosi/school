import { Connection, createConnection } from 'mongoose';
import { config } from 'dotenv';
import { AppLogger } from '../lib/logger/Logger';

config();

class Mongo {
	private static _instance: Connection;
	private static connected: boolean = false;

	private constructor() {
		this.connect();
	}

	private connect() {
		try {
			Mongo._instance = createConnection(process.env.MONGO_URL);

			Mongo._instance.on('connected', () => {
				Mongo.connected = true;
				AppLogger.info('MongoDB connected successfully');
			});

			Mongo._instance.on('error', (error: Error) => {
				Mongo.connected = false;
				AppLogger.error('Error connecting to MongoDB', error);
			});
		} catch (error) {
			Mongo.connected = false;
			AppLogger.error('Error connecting to MongoDB', error);
		}
	}

	public static instance(): Connection {
		if (!Mongo._instance) {
			new Mongo();
		}
		return Mongo._instance;
	}

	public static isConnected(): boolean {
		return Mongo.connected;
	}
}

export default Mongo;

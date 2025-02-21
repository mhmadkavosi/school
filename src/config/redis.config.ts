import { Redis as RedisClient } from 'ioredis';
import { config } from 'dotenv';
import { AppLogger } from '../lib/logger/Logger';

config();

class Redis {
	private static _instance: RedisClient | null = null;
	private static _connected: boolean = false;

	private constructor() {}

	public static get instance(): RedisClient {
		if (!this._instance) {
			try {
				this._instance = new RedisClient(process.env.REDIS_URL, {});

				this._instance.on('connect', () => {
					this._connected = true;
					AppLogger.info('Redis connected');
				});

				this._instance.on('error', (error: Error) => {
					this._connected = false;
					AppLogger.error('Redis connection error', error);
				});
			} catch (error) {
				this._connected = false;
				AppLogger.error('Error in Redis constructor', error);
			}
		}
		return this._instance!;
	}

	public static get isConnected(): boolean {
		return this._connected;
	}
}

export default Redis;

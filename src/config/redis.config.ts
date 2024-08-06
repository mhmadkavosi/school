import { Redis as RedisClient } from 'ioredis';
import { config } from 'dotenv';
import { AppLogger } from '../lib/logger/Logger';

config();

class Redis {
	private static _instance: RedisClient;
	private static connected: boolean = false;

	private constructor() {
		try {
			Redis._instance = new RedisClient(process.env.REDIS_URL);
			Redis._instance.on('connect', () => {
				Redis.connected = true;
				AppLogger.info('Redis connected');
			});
			Redis._instance.on('error', (error: Error) => {
				Redis.connected = false;
				AppLogger.error('Redis connection error', error);
			});
		} catch (e) {
			Redis.connected = false;
			AppLogger.error('Error in Redis constructor', e);
		}
	}

	public static instance(): RedisClient {
		if (!Redis._instance) {
			new Redis();
		}

		return Redis._instance;
	}

	public static isConnected(): boolean {
		return Redis.connected;
	}
}

export default Redis;

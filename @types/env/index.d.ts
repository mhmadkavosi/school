declare global {
	namespace NodeJS {
		interface ProcessEnv {
			APP_NAME: string;
			HOST: string;
			PORT: number;
			POSTGRES_URL: string;
			POSTGRES_DB: string;
			MONGO_URL: string;
			REDIS_URL: string;
			API_KEY: string;
			Teacher_SECRET_KEY: string;
			Teacher_REFRESH_SECRET_KEY: string;
			SECRET_KEY: string;
			REFRESH_SECRET_KEY: string;
			SECRET_KEY_EXPIRE: number;
			REFRESH_KEY_EXPIRE: number;
			Teacher_KEY_EXPIRE: number;
			KAVENEGAR_API_KEY: string;
			NODE_ENV: string;
			AWS_ID: string;
			AWS_SECRET: string;
			AWS_ENDPOINT: string;
		}
	}
}
export {};

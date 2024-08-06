export {};

declare global {
	namespace Express {
		interface Response {
			json?: any;
			setHeader?: any;
		}
	}
}

declare global {
	namespace Express {
		interface Request {
			user_id: string;
			token_id: string;
		}
	}
}

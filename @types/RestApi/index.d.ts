export {};

declare global {
	namespace RestApi {
		interface ResInterface {
			status: number;
			msg?: string | undefined | any;
			data?: any | undefined;
		}

		interface RestApiUserTokenInterface {
			user_id: string;
			token_id: string;
		}

		interface RestApiTeacherTokenInterface {
			user_id: string;
			token_id: string;
			expire_at: Date;
		}

		interface ObjectResInterface {
			is_success: boolean;
			data?: any;
			msg?: string;
		}

		interface RestApiAdminTokenInterface {
			admin_id: string;
			admin_token_id: string;
			expire_at: Date;
		}
		interface RestApiStudentTokenInterface {
			student_id: string;
			student_token_id: string;
			expire_at: Date;
		}
	}
}

import axios from 'axios';
import { AppLogger } from '../lib/logger/Logger';

export class GoogleOAuthService {
	async getAccessTokenFromCode(code: string): Promise<RestApi.ObjectResInterface> {
		try {
			console.log(code);
			const response = await axios({
				url: `https://oauth2.googleapis.com/token`,
				method: 'post',
				data: {
					client_id: '897616646904-oe2bi8g7naoph9ba5266oq8vnulr25fk.apps.googleusercontent.com',
					client_secret: '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',
					redirect_uri: 'https://localhost:3007/auth/teacher/google',
					grant_type: 'authorization_code',
					code
				},
				headers: { 'Content-Type': 'application/json' }
			});

			console.log(response);
			return {
				is_success: true,
				data: response.data
			};
		} catch (error) {
			AppLogger.error(error);
			return {
				is_success: false,
				msg: 'Internal server error'
			};
		}
	}

	async getGoogleUserInfo(access_token: string): Promise<RestApi.ObjectResInterface> {
		try {
			const response = await axios({
				url: 'https://www.googleapis.com/oauth2/v2/userinfo',
				method: 'get',
				headers: {
					Authorization: `Bearer ${access_token}`,
					'Content-Type': 'application/json'
				}
			});

			return {
				is_success: true,
				data: response.data
			};
		} catch (error) {
			AppLogger.error(error);
			return {
				is_success: false,
				msg: 'Internal server error'
			};
		}
	}
}

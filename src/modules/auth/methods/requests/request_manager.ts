import Redis from '../../../../config/redis.config';

export enum RequestType {
	login = 'login',
	register = 'register',
	change_phone_number = 'change_phone_number',
	change_email = 'change_email',
	forgot_password = 'forgot_password'
}

interface IRequest {
	code: string;
	value: string;
	name?: string;
	family?: string;
}

export class AuthRequestManager {
	/**
	 * @param generate_access_address
	 * @param value
	 * @returns
	 */
	public async add_request(type: RequestType, access_address: string, value: IRequest): Promise<string> {
		try {
			await Redis.instance.setex(`${type}_${access_address}`, 250, JSON.stringify(value));
			return 'OK';
		} catch (e) {
			console.error('error in RequestManager add_register_request', e);
			return 'NOK';
		}
	}

	/**
	 *
	 * @param type
	 * @param access_address
	 */
	public async remove_request(type: string, access_address: string): Promise<number> {
		try {
			return await Redis.instance.del(`${type}_${access_address}`);
		} catch (e) {
			console.error('error in RequestManager remove_request', e);
			return 0;
		}
	}

	/**
	 *
	 * @param type
	 * @param access_address
	 */
	public async get_request(type: string, access_address: string): Promise<IRequest | null> {
		try {
			const data = await Redis.instance.get(`${type}_${access_address}`);
			if (data) {
				return JSON.parse(data);
			} else {
				return null;
			}
		} catch (e) {
			console.error('error in RequestManager get_request', e);
			return null;
		}
	}
}

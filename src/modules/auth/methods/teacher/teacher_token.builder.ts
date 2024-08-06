import { TeacherTokenCreate } from './teacher_token_create';

export class TeacherTokenBuilder {
	/**
	 * Builder class for creating an Teacher token object
	 * @private teacher_id The id of the Teacher
	 * @private ip The IP address
	 * @private platform The platform
	 * @private device_name The device name
	 * @private os The operating system
	 * @private user_agent The user agent
	 * @private token_id The token id
	 * @private last_activity The last activity date
	 * @private expire_at The expiration date
	 * @private api_version The API version
	 */

	private teacher_id!: string;
	private ip!: string;
	private platform!: string;
	private device_name!: string;
	private os!: string;
	private user_agent!: string;
	private token_id!: string;
	private last_activity!: Date;
	private expire_at!: Date;
	private api_version!: string;

	public setTeacherId(teacher_id: string): this {
		this.teacher_id = teacher_id;
		return this;
	}

	public getTeacherId(): string {
		return this.teacher_id;
	}

	public setIp(ip: string): this {
		this.ip = ip;
		return this;
	}

	public getIp(): string {
		return this.ip;
	}

	public setPlatform(platform: string): this {
		this.platform = platform;
		return this;
	}

	public getPlatform(): string {
		return this.platform;
	}

	public setDeviceName(device_name: string): this {
		this.device_name = device_name;
		return this;
	}

	public getDeviceName(): string {
		return this.device_name;
	}

	public setOs(os: string): this {
		this.os = os;
		return this;
	}

	public getOs(): string {
		return this.os;
	}

	public setUserAgent(user_agent: string): this {
		this.user_agent = user_agent;
		return this;
	}

	public getUserAgent(): string {
		return this.user_agent;
	}

	public setTokenId(token_id: string): this {
		this.token_id = token_id;
		return this;
	}

	public getTokenId(): string {
		return this.token_id;
	}

	public setLastActivity(last_activity: Date): this {
		this.last_activity = last_activity;
		return this;
	}

	public getLastActivity(): Date {
		return this.last_activity;
	}

	public setExpireAt(expire_at: Date): this {
		this.expire_at = expire_at;
		return this;
	}

	public getExpireAt(): Date {
		return this.expire_at;
	}

	public setApiVersion(api_version: string): this {
		this.api_version = api_version;
		return this;
	}

	public getApiVersion(): string {
		return this.api_version;
	}

	/**
	 * Build and store the Teacher token
	 * @returns ObjectResInterface
	 */
	public async build(): Promise<RestApi.ObjectResInterface> {
		return await new TeacherTokenCreate().save(this);
	}
}

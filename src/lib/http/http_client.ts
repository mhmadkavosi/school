import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { AppLogger } from '../logger/Logger';

export class HttpClient {
	private readonly client: AxiosInstance;

	constructor(baseURL: string) {
		this.client = axios.create({
			baseURL: baseURL,
			responseType: 'json',
			validateStatus: function (status: number) {
				return (status >= 200 && status < 300) || status == 404;
			}
		});
	}

	public async get<T>(url: string, config?: any): Promise<AxiosResponse<any>> {
		try {
			return await this.client.get<T>(url, config);
		} catch (e: any) {
			AppLogger.error(`An error occurred while making GET request  url :${url}`, e);
			return e;
		}
	}

	public async post<T>(url: string, data?: any, config?: any): Promise<AxiosResponse<any>> {
		try {
			return await this.client.post<T>(url, data, config);
		} catch (e: any) {
			AppLogger.error(`An error occurred while making POST url :${url}:`, e);
			return e;
		}
	}

	public async put<T>(url: string, data?: any, config?: any): Promise<AxiosResponse<any>> {
		try {
			return await this.client.put<T>(url, data, config);
		} catch (e: any) {
			AppLogger.error(`An error occurred while making PUT url :${url}`, e);
			return e;
		}
	}

	public async delete<T>(url: string, data: any, config?: any): Promise<AxiosResponse<any>> {
		try {
			return await this.client.delete<T>(url, { data: data, headers: config });
		} catch (e: any) {
			AppLogger.error(`An error occurred while making DELETE url :${url}`, e);
			return e;
		}
	}
}

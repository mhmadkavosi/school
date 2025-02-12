import { NotificationStatusEnum } from '../../models/enums/notification_status.enum';
import { NotificationCreate } from './notification_create';

export class NotificationBuilder {
	private title!: string;
	private status!: NotificationStatusEnum;
	private type!: string;
	private details?: string;

	public setTitle(title: string): this {
		this.title = title;
		return this;
	}

	public setStatus(status: NotificationStatusEnum): this {
		this.status = status;
		return this;
	}

	public setType(type: string): this {
		this.type = type;
		return this;
	}

	public setDetails(details: string): this {
		this.details = details;
		return this;
	}

	public getTitle(): string {
		return this.title;
	}

	public getStatus(): NotificationStatusEnum {
		return this.status;
	}

	public getType(): string {
		return this.type;
	}

	public getDetails(): string | undefined {
		return this.details;
	}

	public async build(): Promise<RestApi.ObjectResInterface> {
		return await new NotificationCreate().create(this);
	}
}

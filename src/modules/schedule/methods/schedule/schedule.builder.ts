import { EventTypes } from '../../models/enums/event_type.enum';
import { ScheduleCreate } from './schedule_create';

export class ScheduleBuilder {
	private title!: string;
	private eventDate!: Date;
	private eventStartHour!: string;
	private eventEndHour!: string;
	private eventDescription!: string | null;
	private eventCategoryId!: string | null;
	private eventType!: EventTypes;
	private teacher_id!: string;
	private school_id!: string;

	public setTeacherId(teacher_id: string): this {
		this.teacher_id = teacher_id;
		return this;
	}
	public setSchoolId(school_id: string): this {
		this.school_id = school_id;
		return this;
	}

	public setTitle(title: string): this {
		this.title = title;
		return this;
	}

	public setEventDate(eventDate: Date): this {
		this.eventDate = eventDate;
		return this;
	}

	public setEventStartHour(eventStartHour: string): this {
		this.eventStartHour = eventStartHour;
		return this;
	}

	public setEventEndHour(eventEndHour: string): this {
		this.eventEndHour = eventEndHour;
		return this;
	}

	public setEventDescription(eventDescription: string | null): this {
		this.eventDescription = eventDescription;
		return this;
	}

	public setEventCategoryId(eventCategoryId: string | null): this {
		this.eventCategoryId = eventCategoryId;
		return this;
	}

	public setEventType(eventType: EventTypes): this {
		this.eventType = eventType;
		return this;
	}

	public getTeacherId(): string {
		return this.teacher_id;
	}

	public getSchoolId(): string {
		return this.school_id;
	}

	public getTitle(): string {
		return this.title;
	}

	public getEventDate(): Date {
		return this.eventDate;
	}

	public getEventStartHour(): string {
		return this.eventStartHour;
	}

	public getEventEndHour(): string {
		return this.eventEndHour;
	}

	public getEventDescription(): string | null {
		return this.eventDescription;
	}

	public getEventCategoryId(): string | null {
		return this.eventCategoryId;
	}

	public getEventType(): EventTypes {
		return this.eventType;
	}

	public async build(): Promise<RestApi.ObjectResInterface> {
		return await new ScheduleCreate().create(this);
	}
}

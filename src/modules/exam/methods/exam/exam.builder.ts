import { ExamCreate } from './exam_create';

export class ExamBuilder {
	private title!: string;
	private date!: Date;
	private start_hour!: string | null;
	private end_hour!: string | null;
	private description!: string | null;
	private type!: string | null;
	private teacher_id!: string;
	private color!: string;

	public setTitle(title: string): this {
		this.title = title;
		return this;
	}

	public getTitle(): string {
		return this.title;
	}

	public setDate(date: Date): this {
		this.date = date;
		return this;
	}

	public getDate(): Date {
		return this.date;
	}

	public setStartHour(start_hour: string | null): this {
		this.start_hour = start_hour;
		return this;
	}

	public getStartHour(): string | null {
		return this.start_hour;
	}

	public setEndHour(end_hour: string | null): this {
		this.end_hour = end_hour;
		return this;
	}

	public getEndHour(): string | null {
		return this.end_hour;
	}

	public setDescription(description: string | null): this {
		this.description = description;
		return this;
	}

	public getDescription(): string | null {
		return this.description;
	}

	public setType(type: string | null): this {
		this.type = type;
		return this;
	}

	public getType(): string | null {
		return this.type;
	}

	public setTeacherId(teacher_id: string): this {
		this.teacher_id = teacher_id;
		return this;
	}

	public getTeacherId(): string {
		return this.teacher_id;
	}

	public setColor(color: string): this {
		this.color = color;
		return this;
	}

	public getColor(): string {
		return this.color;
	}

	public async build(): Promise<RestApi.ObjectResInterface> {
		return await new ExamCreate().create(this);
	}
}

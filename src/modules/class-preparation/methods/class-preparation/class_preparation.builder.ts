import { ClassPreparationCreate } from './class-preparation_create';

export class ClassPreparationBuilder {
	private date!: Date;
	private preparation_id!: string;
	private teacher_id!: string;
	private subject!: string;

	public setDate(date: Date): this {
		this.date = date;
		return this;
	}

	public setPreparationId(preparation_id: string): this {
		this.preparation_id = preparation_id;
		return this;
	}

	public setTeacherId(teacher_id: string): this {
		this.teacher_id = teacher_id;
		return this;
	}

	public setSubject(subject: string): this {
		this.subject = subject;
		return this;
	}

	public getDate(): Date {
		return this.date;
	}

	public getPreparationId(): string {
		return this.preparation_id;
	}

	public getTeacherId(): string {
		return this.teacher_id;
	}

	public getSubject(): string {
		return this.subject;
	}

	public async build(): Promise<RestApi.ObjectResInterface> {
		return await new ClassPreparationCreate().create(this);
	}
}

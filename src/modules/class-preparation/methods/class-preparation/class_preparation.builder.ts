import { ClassPreparationCreate } from './class-preparation_create';

export class ClassPreparationBuilder {
	private date!: Date;
	private subject!: string;
	private teacher_id!: string;

	public setDate(date: Date): this {
		this.date = date;
		return this;
	}

	public setSubject(subject: string): this {
		this.subject = subject;
		return this;
	}

	public setTeacherId(teacher_id: string): this {
		this.teacher_id = teacher_id;
		return this;
	}

	public getDate(): Date {
		return this.date;
	}

	public getSubject(): string {
		return this.subject;
	}

	public getTeacherId(): string {
		return this.teacher_id;
	}

	public async build(): Promise<RestApi.ObjectResInterface> {
		return await new ClassPreparationCreate().create(this);
	}
}

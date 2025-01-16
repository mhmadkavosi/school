import { StudentHomeWorkStatusEnum } from '../../models/enums/student_home_work.enum';
import { StudentHomeWorkCreate } from './student_home_work_create';

export class StudentHomeWorkBuilder {
	private class_home_work_id!: string;
	private home_work_id!: string;
	private student_id!: string;
	private status!: StudentHomeWorkStatusEnum;
	private score!: number;
	private status_description!: string;
	private status_time!: Date;

	public setClassHomeWorkId(class_home_work_id: string): this {
		this.class_home_work_id = class_home_work_id;
		return this;
	}

	public getClassHomeWorkId(): string {
		return this.class_home_work_id;
	}

	public setHomeWorkId(home_work_id: string): this {
		this.home_work_id = home_work_id;
		return this;
	}

	public getHomeWorkId(): string {
		return this.home_work_id;
	}

	public setStudentId(student_id: string): this {
		this.student_id = student_id;
		return this;
	}

	public getStudentId(): string {
		return this.student_id;
	}

	public setStatus(status: StudentHomeWorkStatusEnum): this {
		this.status = status;
		return this;
	}

	public getStatus(): StudentHomeWorkStatusEnum {
		return this.status;
	}

	public setScore(score: number): this {
		this.score = score;
		return this;
	}

	public getScore(): number {
		return this.score;
	}

	public setStatusDescription(status_description: string): this {
		this.status_description = status_description;
		return this;
	}

	public getStatusDescription(): string {
		return this.status_description;
	}

	public setStatusTime(status_time: Date): this {
		this.status_time = status_time;
		return this;
	}

	public getStatusTime(): Date {
		return this.status_time;
	}

	public async build(): Promise<RestApi.ObjectResInterface> {
		return await new StudentHomeWorkCreate().create(this);
	}
}

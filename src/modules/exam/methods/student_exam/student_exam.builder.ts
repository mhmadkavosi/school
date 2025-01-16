import { StudentExamCreate } from './student_exam_create';

export class StudentExamBuilder {
	private exam_id!: string;
	private points!: number;
	private class_id!: string;
	private student_id!: string;

	public setExamId(exam_id: string): this {
		this.exam_id = exam_id;
		return this;
	}

	public getExamId(): string {
		return this.exam_id;
	}

	public setPoints(points: number): this {
		this.points = points;
		return this;
	}

	public getPoints(): number {
		return this.points;
	}

	public setClassId(class_id: string): this {
		this.class_id = class_id;
		return this;
	}

	public getClassId(): string {
		return this.class_id;
	}

	public setStudentId(student_id: string): this {
		this.student_id = student_id;
		return this;
	}

	public getStudentId(): string {
		return this.student_id;
	}

	public async build(): Promise<RestApi.ObjectResInterface> {
		return await new StudentExamCreate().create(this);
	}
}

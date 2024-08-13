import { ClassCreate } from './class_create';

export class ClassBuilder {
	private school_id!: string;
	private major_id!: string;
	private class_level_id!: string;
	private count!: number;
	private link!: string;
	private teacher_id!: string;
	private name!: string;

	public setSchoolId(schoolId: string): this {
		this.school_id = schoolId;
		return this;
	}

	public setMajorId(majorId: string): this {
		this.major_id = majorId;
		return this;
	}

	public setClassLevelId(classLevelId: string): this {
		this.class_level_id = classLevelId;
		return this;
	}

	public setCount(count: number): this {
		this.count = count;
		return this;
	}

	public setLink(link: string): this {
		this.link = link;
		return this;
	}

	public setTeacherId(teacherId: string): this {
		this.teacher_id = teacherId;
		return this;
	}

	public setName(name: string): this {
		this.name = name;
		return this;
	}

	public getSchoolId(): string {
		return this.school_id;
	}

	public getMajorId(): string {
		return this.major_id;
	}

	public getClassLevelId(): string {
		return this.class_level_id;
	}

	public getCount(): number {
		return this.count;
	}

	public getLink(): string {
		return this.link;
	}

	public getTeacherId(): string {
		return this.teacher_id;
	}

	public getName(): string {
		return this.name;
	}

	public async build(): Promise<RestApi.ObjectResInterface> {
		return await new ClassCreate().create(this);
	}
}
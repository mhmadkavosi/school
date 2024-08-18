import { HomeWorkCreate } from './home_work_create';

export class HomeWorkBuilder {
	private title!: string;
	private start_date!: Date;
	private end_date!: Date;
	private description!: string;
	private file!: string;
	private file_type!: string;
	private max_score!: number;
	private min_score!: number;
	private teacher_id!: string;

	public setTitle(title: string): this {
		this.title = title;
		return this;
	}

	public getTitle(): string {
		return this.title;
	}

	public setStartDate(start_date: Date): this {
		this.start_date = start_date;
		return this;
	}

	public getStartDate(): Date {
		return this.start_date;
	}

	public setEndDate(end_date: Date): this {
		this.end_date = end_date;
		return this;
	}

	public getEndDate(): Date {
		return this.end_date;
	}

	public setDescription(description: string): this {
		this.description = description;
		return this;
	}

	public getDescription(): string {
		return this.description;
	}

	public setFile(file: string): this {
		this.file = file;
		return this;
	}

	public getFile(): string {
		return this.file;
	}

	public setFileType(file_type: string): this {
		this.file_type = file_type;
		return this;
	}

	public getFileType(): string {
		return this.file_type;
	}

	public setMaxScore(max_score: number): this {
		this.max_score = max_score;
		return this;
	}

	public getMaxScore(): number {
		return this.max_score;
	}

	public setMinScore(min_score: number): this {
		this.min_score = min_score;
		return this;
	}

	public getMinScore(): number {
		return this.min_score;
	}

	public setTeacherId(teacher_id: string): this {
		this.teacher_id = teacher_id;
		return this;
	}

	public getTeacherId(): string {
		return this.teacher_id;
	}

	public async build(): Promise<RestApi.ObjectResInterface> {
		return await new HomeWorkCreate().create(this);
	}
}

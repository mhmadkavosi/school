import { NewsCreate } from './news_create';

export class NewsBuilder {
	private school_id!: string;
	private title!: string;
	private news_category_id!: string;
	private description!: string;
	private file!: string;
	private priority!: number;

	public setSchoolId(school_id: string): this {
		this.school_id = school_id;
		return this;
	}

	public getSchoolId(): string {
		return this.school_id;
	}

	public setTitle(title: string): this {
		this.title = title;
		return this;
	}

	public getTitle(): string {
		return this.title;
	}

	public setNewsCategoryId(news_category_id: string): this {
		this.news_category_id = news_category_id;
		return this;
	}

	public getNewsCategoryId(): string {
		return this.news_category_id;
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

	public setPriority(priority: number): this {
		this.priority = priority;
		return this;
	}

	public getPriority(): number {
		return this.priority;
	}

	public async build(): Promise<RestApi.ObjectResInterface> {
		return await new NewsCreate().create(this);
	}
}

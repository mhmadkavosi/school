import { PreparationCreate } from './preparation_create';

export class PreparationBuilder {
	private preparation_year_start!: string;
	private preparation_year_end!: string;
	private subject!: string;
	private class_level_id!: string;
	private grade!: string;
	private semester?: string;
	private part?: string;
	private notes?: string;
	private season?: string;

	// Set the preparation year start
	public setPreparationYearStart(preparationYearStart: string): this {
		this.preparation_year_start = preparationYearStart;
		return this;
	}

	// Set the preparation year end
	public setPreparationYearEnd(preparationYearEnd: string): this {
		this.preparation_year_end = preparationYearEnd;
		return this;
	}

	// Set the subject
	public setSubject(subject: string): this {
		this.subject = subject;
		return this;
	}

	// Set the class level id
	public setClassLevelId(classLevelId: string): this {
		this.class_level_id = classLevelId;
		return this;
	}

	// Set the grade
	public setGrade(grade: string): this {
		this.grade = grade;
		return this;
	}

	// Set the semester (optional)
	public setSemester(semester: string): this {
		this.semester = semester;
		return this;
	}

	// Set the part (optional)
	public setPart(part: string): this {
		this.part = part;
		return this;
	}

	// Set the notes (optional)
	public setNotes(notes: string): this {
		this.notes = notes;
		return this;
	}

	public setSeason(season: string): this {
		this.season = season;
		return this;
	}

	// Getters for the fields (if needed)
	public getPreparationYearStart(): string {
		return this.preparation_year_start;
	}

	public getPreparationYearEnd(): string {
		return this.preparation_year_end;
	}

	public getSubject(): string {
		return this.subject;
	}

	public getClassLevelId(): string {
		return this.class_level_id;
	}

	public getGrade(): string {
		return this.grade;
	}

	public getSemester(): string | undefined {
		return this.semester;
	}

	public getPart(): string | undefined {
		return this.part;
	}

	public getNotes(): string | undefined {
		return this.notes;
	}

	public getSeason(): string | undefined {
		return this.season;
	}

	public async build(): Promise<RestApi.ObjectResInterface> {
		return await new PreparationCreate().create(this);
	}
}

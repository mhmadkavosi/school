import { PreparationPlanCreate } from './preparation_plan_create';

export class PreparationPlanBuilder {
	private week_number!: number;
	private field!: string;
	private basic_concept!: string;
	private number_of_class!: number;
	private preparation_id!: string;
	private season!: string;
	private subject!: string;
	private notes!: string;

	public setNotes(notes: string): this {
		this.notes = notes;
		return this;
	}

	public setSeason(season: string): this {
		this.season = season;
		return this;
	}

	public setSubject(subject: string): this {
		this.subject = subject;
		return this;
	}
	// Set the week number
	public setWeekNumber(weekNumber: number): this {
		this.week_number = weekNumber;
		return this;
	}

	// Set the field
	public setField(field: string): this {
		this.field = field;
		return this;
	}

	// Set the basic concept
	public setBasicConcept(basicConcept: string): this {
		this.basic_concept = basicConcept;
		return this;
	}

	// Set the number of classes
	public setNumberOfClass(numberOfClass: number): this {
		this.number_of_class = numberOfClass;
		return this;
	}

	// Set the preparation ID
	public setPreparationId(preparationId: string): this {
		this.preparation_id = preparationId;
		return this;
	}

	// Getters for the fields (if needed)
	public getWeekNumber(): number {
		return this.week_number;
	}

	public getField(): string {
		return this.field;
	}

	public getBasicConcept(): string {
		return this.basic_concept;
	}

	public getNumberOfClass(): number {
		return this.number_of_class;
	}

	public getPreparationId(): string {
		return this.preparation_id;
	}

	public getSeason(): string | undefined {
		return this.season;
	}

	public getSubject(): string | undefined {
		return this.subject;
	}

	public getNotes(): string {
		return this.notes;
	}

	public async build(): Promise<RestApi.ObjectResInterface> {
		return await new PreparationPlanCreate().create(this);
	}
}

import { ClassPreparationCreate } from './class-preparation_create';

export class ClassPreparationBuilder {
	private date!: Date;
	private subject!: string;
	private knowledge_objectives!: string;
	private skill_objectives!: string;
	private emotional_objectives!: string;
	private teaching_aids!: string;
	private acquired_skills!: string;
	private present!: string;
	private apply!: string;
	private value_and_expand!: string;
	private teacher_id!: string;

	public setDate(date: Date): this {
		this.date = date;
		return this;
	}

	public setSubject(subject: string): this {
		this.subject = subject;
		return this;
	}

	public setKnowledgeObjectives(knowledge_objectives: string): this {
		this.knowledge_objectives = knowledge_objectives;
		return this;
	}

	public setSkillObjectives(skill_objectives: string): this {
		this.skill_objectives = skill_objectives;
		return this;
	}

	public setEmotionalObjectives(emotional_objectives: string): this {
		this.emotional_objectives = emotional_objectives;
		return this;
	}

	public setTeachingAids(teaching_aids: string): this {
		this.teaching_aids = teaching_aids;
		return this;
	}

	public setAcquiredSkills(acquired_skills: string): this {
		this.acquired_skills = acquired_skills;
		return this;
	}

	public setPresent(present: string): this {
		this.present = present;
		return this;
	}

	public setApply(apply: string): this {
		this.apply = apply;
		return this;
	}

	public setValueAndExpand(value_and_expand: string): this {
		this.value_and_expand = value_and_expand;
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

	public getKnowledgeObjectives(): string {
		return this.knowledge_objectives;
	}

	public getSkillObjectives(): string {
		return this.skill_objectives;
	}

	public getEmotionalObjectives(): string {
		return this.emotional_objectives;
	}

	public getTeachingAids(): string {
		return this.teaching_aids;
	}

	public getAcquiredSkills(): string {
		return this.acquired_skills;
	}

	public getPresent(): string {
		return this.present;
	}

	public getApply(): string {
		return this.apply;
	}

	public getValueAndExpand(): string {
		return this.value_and_expand;
	}

	public getTeacherId(): string {
		return this.teacher_id;
	}

	public async build(): Promise<RestApi.ObjectResInterface> {
		return await new ClassPreparationCreate().create(this);
	}
}

import { StudentCreate } from './student_create';

export class StudentBuilder {
	public class_id!: string;
	public name!: string;
	public family!: string;
	public middle_name!: string;
	public email!: string;
	public phone!: string;
	public national_code!: string;
	public student_status?: string;
	public birth_date?: Date;
	public password!: string;
	public profile_picture?: string;

	public setClassId(class_id: string): this {
		this.class_id = class_id;
		return this;
	}

	public setName(name: string): this {
		this.name = name;
		return this;
	}

	public setMiddleName(middle_name: string): this {
		this.middle_name = middle_name;
		return this;
	}

	public setFamily(family: string): this {
		this.family = family;
		return this;
	}

	public setEmail(email: string): this {
		this.email = email;
		return this;
	}

	public setPhone(phone: string): this {
		this.phone = phone;
		return this;
	}

	public setNationalCode(national_code: string): this {
		this.national_code = national_code;
		return this;
	}

	public setStudentStatus(student_status: string): this {
		this.student_status = student_status;
		return this;
	}

	public setBirthDate(birth_date: Date): this {
		this.birth_date = birth_date;
		return this;
	}

	public setPassword(password: string): this {
		this.password = password;
		return this;
	}

	public setProfilePicture(profile_picture: string): this {
		this.profile_picture = profile_picture;
		return this;
	}

	public getClassId(): string {
		return this.class_id;
	}

	public getName(): string {
		return this.name;
	}

	public getMiddleName(): string {
		return this.middle_name;
	}

	public getFamily(): string {
		return this.family;
	}

	public getEmail(): string {
		return this.email;
	}

	public getPhone(): string {
		return this.phone;
	}

	public getNationalCode(): string {
		return this.national_code;
	}

	public getStudentStatus(): string | undefined {
		return this.student_status;
	}

	public getBirthDate(): Date | undefined {
		return this.birth_date;
	}

	public getPassword(): string {
		return this.password;
	}

	public getProfilePicture(): string | undefined {
		return this.profile_picture;
	}

	public async build(): Promise<RestApi.ObjectResInterface> {
		return await new StudentCreate().create(this);
	}
}

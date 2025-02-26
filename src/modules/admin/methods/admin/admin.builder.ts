import { AdminCreate } from './admin_create';
import { hash_password } from '../../../../utils/hashed_id_generetor.utility';

export class AdminBuilder {
	private email!: string;
	private name!: string;
	private family!: string;
	private password!: string;
	private about_me!: string;

	public setEmail(email: string): this {
		this.email = email;
		return this;
	}

	public getEmail(): string {
		return this.email;
	}

	public setAboutMe(about_me: string): this {
		this.about_me = about_me;
		return this;
	}

	public getAboutMe(): string {
		return this.about_me;
	}

	public setName(name: string): this {
		this.name = name;
		return this;
	}

	public getName(): string {
		return this.name;
	}

	public setFamily(family: string): this {
		this.family = family;
		return this;
	}

	public getFamily(): string {
		return this.family;
	}

	public setPassword(password: string): this {
		this.password = hash_password(password);
		return this;
	}

	public getPassword(): string {
		return this.password;
	}

	public async build(): Promise<RestApi.ObjectResInterface> {
		return await new AdminCreate().save(this);
	}
}

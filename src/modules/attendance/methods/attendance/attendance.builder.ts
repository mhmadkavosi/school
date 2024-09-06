import { AttendanceTypeEnum } from '../../models/enums/attendance_type.enum';
import { AttendanceCreate } from './attendance_create';

export class AttendanceBuilder {
	private date!: Date;
	private student_id!: string;
	private class_id!: string;
	private attendance_reason_id!: string;
	private attendance_type!: AttendanceTypeEnum;
	private time_of_delayed: number = 0;

	public setDate(date: Date): this {
		this.date = date;
		return this;
	}

	public getDate(): Date {
		return this.date;
	}

	public setStudentId(student_id: string): this {
		this.student_id = student_id;
		return this;
	}

	public getStudentId(): string {
		return this.student_id;
	}

	public setClassId(class_id: string): this {
		this.class_id = class_id;
		return this;
	}

	public getClassId(): string {
		return this.class_id;
	}

	public setAttendanceReasonId(attendance_reason_id: string): this {
		this.attendance_reason_id = attendance_reason_id;
		return this;
	}

	public getAttendanceReasonId(): string {
		return this.attendance_reason_id;
	}

	public setAttendanceType(attendance_type: AttendanceTypeEnum): this {
		this.attendance_type = attendance_type;
		return this;
	}

	public getAttendanceType(): AttendanceTypeEnum {
		return this.attendance_type;
	}

	public setTimeOfDelayed(time_of_delayed: number): this {
		this.time_of_delayed = time_of_delayed;
		return this;
	}

	public getTimeOfDelayed(): number {
		return this.time_of_delayed;
	}

	public async build(): Promise<RestApi.ObjectResInterface> {
		return await new AttendanceCreate().create(this);
	}
}

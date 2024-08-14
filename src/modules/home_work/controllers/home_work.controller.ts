import { ClassHomeWorkInfo } from './../methods/class_home_work/class_home_work_info';
import { Response, Request } from 'express';
import Validator from 'validatorjs';
import { PreconditionFailedError } from '../../../lib/http/error/precondition_failed.error';
import { HomeWorkBuilder } from '../methods/home_work/home_work.builder';
import { InternalServerError } from '../../../lib/http/error/internal_server.error';
import { ClassHomeWorkCreate } from '../methods/class_home_work/class_home_work_create';
import { StudentInfo } from '../../student/methods/student_info';
import { StudentHomeWorkBuilder } from '../methods/student_home_work/student_home_work.builder';
import { StudentHomeWorkStatusEnum } from '../models/enums/student_home_work.enum';
import { StudentHomeWrkInfo } from '../methods/student_home_work/student_home_work_info';
import { ApiRes } from '../../../lib/http/api_response';
import { HttpStatus } from '../../../lib/http/http_status';
import { HomeWorkUpdate } from '../methods/home_work/home_work_update';
import { HomeWorkDestroy } from '../methods/home_work/home_work_destroy';
import { StudentHomeWorDestroy } from '../methods/student_home_work/student_home_work_destroy';
import { ClassHomeWorkDestroy } from '../methods/class_home_work/class_home_work_destroy';

export const create = async (req: Request, res: Response) => {
	const validate = new Validator(
		{
			title: req.body.title,
			start_date: req.body.start_date,
			end_date: req.body.end_date,
			description: req.body.description,
			file: req.body.file,
			max_score: req.body.max_score,
			min_score: req.body.min_score,
			classes_id: req.body.classes_id,
			students_id: req.body.students_id
		},
		{
			title: ['required', 'string'],
			start_date: ['string'],
			end_date: ['string'],
			description: ['string'],
			file: ['string'],
			max_score: ['numeric'],
			min_score: ['numeric'],
			classes_id: ['array'],
			students_id: ['array']
		}
	);

	if (validate.fails()) {
		return new PreconditionFailedError(res, validate.errors.all());
	}

	const home_work = await new HomeWorkBuilder()
		.setTitle(req.body.title)
		.setStartDate(req.body.start_date)
		.setEndDate(req.body.end_date)
		.setDescription(req.body.description)
		.setFile(req.body.file)
		.setMaxScore(req.body.max_score)
		.setMinScore(req.body.min_score)
		.setTeacherId(req.user_id)
		.build();

	if (!home_work.is_success) {
		return new InternalServerError(res, 'Create Home work failed!');
	}

	if (req.body.classes_id && req.body.classes_id.length > 0) {
		for (let i = 0; i < req.body.classes_id.length; i++) {
			const class_home_work = await new ClassHomeWorkCreate().create(
				req.body.classes_id[i],
				home_work.data.id
			);
			const student_of_class = await new StudentInfo().get_all_student_of_class(req.body.classes_id[i]);

			for (let j = 0; j < student_of_class.data.length; j++) {
				const student_home_work = await new StudentHomeWorkBuilder()
					.setClassHomeWorkId(class_home_work.data.id)
					.setHomeWorkId(home_work.data.id)
					.setStudentId(student_of_class.data[j].id)
					.setStatus(StudentHomeWorkStatusEnum.undone)
					.build();

				console.log(student_home_work);
			}
		}
	}

	if (req.body.students_id && req.body.students_id.length > 0) {
		for (let i = 0; i < req.body.students_id.length; i++) {
			const student_home_work = await new StudentHomeWrkInfo().get_info_by_student_id_home_work_id(
				req.body.students_id[i],
				home_work.data.id
			);

			if (student_home_work.is_success) {
				return new InternalServerError(res, 'Create Home work failed!');
			}

			await new StudentHomeWorkBuilder()
				.setHomeWorkId(home_work.data.id)
				.setStudentId(req.body.students_id[i])
				.setStatus(StudentHomeWorkStatusEnum.undone)
				.build();
		}
	}

	return ApiRes(res, { status: HttpStatus.OK });
};

export const add_home_work_for_classes = async (req: Request, res: Response) => {
	const validate = new Validator(
		{
			home_work_id: req.body.home_work_id,
			classes_id: req.body.classes_id,
			students_id: req.body.students_id
		},
		{
			home_work_id: ['required', 'string'],
			classes_id: ['array'],
			students_id: ['array']
		}
	);

	if (validate.fails()) {
		return new PreconditionFailedError(res, validate.errors.all());
	}

	if (req.body.classes_id && req.body.classes_id.length > 0) {
		for (let i = 0; i < req.body.classes_id.length; i++) {
			const class_home_work_info = await new ClassHomeWorkInfo().get_info(
				req.body.classes_id[i],
				req.body.home_work_id
			);
			if (class_home_work_info.is_success) {
				return new InternalServerError(res, 'add class to this home work failed!');
			}
			const class_home_work = await new ClassHomeWorkCreate().create(
				req.body.classes_id[i],
				req.body.home_work_id
			);
			const student_of_class = await new StudentInfo().get_all_student_of_class(req.body.classes_id[i]);
			for (let j = 0; j < student_of_class.data.length; j++) {
				await new StudentHomeWorkBuilder()
					.setClassHomeWorkId(class_home_work.data.id)
					.setHomeWorkId(req.body.home_work_id)
					.setStudentId(student_of_class.data[j].id)
					.setStatus(StudentHomeWorkStatusEnum.undone)
					.build();
			}
		}
	}

	if (req.body.students_id && req.body.students_id.length > 0) {
		for (let i = 0; i < req.body.students_id.length; i++) {
			const student_home_work = await new StudentHomeWrkInfo().get_info_by_student_id_home_work_id(
				req.body.students_id[i],
				req.body.home_work_id
			);

			if (student_home_work.is_success) {
				return new InternalServerError(res, 'add home work for student failed');
			}

			await new StudentHomeWorkBuilder()
				.setHomeWorkId(req.body.home_work_id)
				.setStudentId(req.body.students_id[i])
				.setStatus(StudentHomeWorkStatusEnum.undone)
				.build();
		}
	}

	return ApiRes(res, { status: HttpStatus.OK });
};

export const update = async (req: Request, res: Response) => {
	const validate = new Validator(
		{
			home_work_id: req.body.home_work_id,
			title: req.body.title,
			start_date: req.body.start_date,
			end_date: req.body.end_date,
			description: req.body.description,
			file: req.body.file,
			max_score: req.body.max_score,
			min_score: req.body.min_score
		},
		{
			home_work_id: ['required', 'string'],
			title: ['string'],
			start_date: ['string'],
			end_date: ['string'],
			description: ['string'],
			file: ['string'],
			max_score: ['numeric'],
			min_score: ['numeric']
		}
	);

	if (validate.fails()) {
		return new PreconditionFailedError(res, validate.errors.all());
	}

	const home_work = await new HomeWorkUpdate().update(
		req.body.home_work_id,
		req.user_id,
		req.body.title,
		req.body.start_date,
		req.body.end_date,
		req.body.description,
		req.body.file,
		req.body.max_score,
		req.body.min_score
	);

	return ApiRes(res, {
		status: home_work.is_success ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR
	});
};

export const get_all_home_work_of_teacher = async (req: Request, res: Response) => {
	const result = await new ClassHomeWorkInfo().get_home_work_of_teacher(req.user_id);

	return ApiRes(res, {
		status: result.is_success ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR,
		data: result.data
	});
};

export const get_all_student_of_home_work = async (req: Request, res: Response) => {
	const result = await new StudentHomeWrkInfo().get_student_of_home_work(req.params.home_work_id);

	return ApiRes(res, {
		status: result.is_success ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR,
		data: result.data
	});
};

export const get_count_of_home_work = async (req: Request, res: Response) => {
	const result = await new StudentHomeWrkInfo().get_count_of_status_home_works(req.params.home_work_id);

	return ApiRes(res, {
		status: result.is_success ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR,
		data: result.data
	});
};

export const delete_home_work = async (req: Request, res: Response) => {
	const validate = new Validator(
		{
			home_work_id: req.body.home_work_id
		},
		{
			home_work_id: ['required', 'string']
		}
	);

	if (validate.fails()) {
		return new PreconditionFailedError(res, validate.errors.all());
	}

	await new ClassHomeWorkDestroy().destroy_by_home_work_id(req.body.home_work_id);
	await new StudentHomeWorDestroy().destroy_by_home_work_id(req.body.home_work_id);
	await new HomeWorkDestroy().destroy(req.body.home_work_id);

	return ApiRes(res, {
		status: HttpStatus.OK
	});
};

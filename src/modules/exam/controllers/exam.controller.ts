import { Request, Response } from 'express';
import { PreconditionFailedError } from '../../../lib/http/error/precondition_failed.error';
import Validator from 'validatorjs';
import { ExamTypeEnum } from '../models/enums/exam_type.enum';
import { ExamBuilder } from '../methods/exam/exam.builder';
import { InternalServerError } from '../../../lib/http/error/internal_server.error';
import { StudentInfo } from '../../student/methods/student_info';
import { StudentExamBuilder } from '../methods/student_exam/student_exam.builder';
import { ExamClassCreate } from '../methods/exam_class/exam_class_create';
import { ApiRes } from '../../../lib/http/api_response';
import { ExamDestroy } from '../methods/exam/exam_destroy';
import { ExamClassDestroy } from '../methods/exam_class/exam_class_destroy';
import { StudentExamDestroy } from '../methods/student_exam/student_exam_destroy';
import { ExamUpdate } from '../methods/exam/exam_update';
import { HttpStatus } from '../../../lib/http/http_status';
import { ExamClassInfo } from '../methods/exam_class/exam_class_info';
import { StudentExamInfo } from '../methods/student_exam/student_exam_info';
import { StudentExamUpdate } from '../methods/student_exam/student_exam_update';
import { ExamInfo } from '../methods/exam/exam_info';

export const create = async (req: Request, res: Response) => {
	const validate = new Validator(
		{
			title: req.body.title,
			date: req.body.date,
			start_hour: req.body.start_hour,
			end_hour: req.body.end_hour,
			description: req.body.description,
			type: req.body.type,
			color: req.body.color,
			classes_id: req.body.classes_id
		},
		{
			title: ['required', 'string'],
			date: ['required', 'date'],
			start_hour: ['string'],
			end_hour: ['string'],
			description: ['string'],
			type: ['required', 'string', { in: Object.keys(ExamTypeEnum) }],
			color: ['string'],
			classes_id: ['required', 'array']
		}
	);

	if (validate.fails()) {
		return new PreconditionFailedError(res, validate.errors.all());
	}

	const exam_create = await new ExamBuilder()
		.setTitle(req.body.title)
		.setDate(req.body.date)
		.setStartHour(req.body.start_hour)
		.setEndHour(req.body.end_hour)
		.setDescription(req.body.description)
		.setType(req.body.type)
		.setTeacherId(req.user_id)
		.setColor(req.body.color)
		.build();

	if (!exam_create.is_success) {
		return new InternalServerError(res, 'Failed to create exam');
	}

	if (req.body.classes_id && req.body.classes_id.length > 0) {
		for (let i = 0; i < req.body.classes_id.length; i++) {
			await new ExamClassCreate().create(req.body.classes_id[i], exam_create.data.id);
			const student_of_class = await new StudentInfo().get_all_student_of_class(req.body.classes_id[i]);
			if (!student_of_class.is_success) {
				return new InternalServerError(res, 'Failed to create exam');
			}
			for (let j = 0; j < student_of_class.data.length; j++) {
				await new StudentExamBuilder()
					.setExamId(exam_create.data.id)
					.setPoints(0)
					.setClassId(req.body.classes_id[i])
					.setStudentId(student_of_class.data[j].id)
					.build();
			}
		}
	}

	return ApiRes(res, {
		status: 200
	});
};

export const delete_exam = async (req: Request, res: Response) => {
	const validate = new Validator(
		{
			exam_id: req.body.exam_id
		},
		{
			exam_id: ['required', 'string']
		}
	);

	if (validate.fails()) {
		return new PreconditionFailedError(res, validate.errors.all());
	}

	await new ExamDestroy().destroy(req.body.exam_id, req.user_id);
	await new ExamClassDestroy().destroy_by_exam_id(req.body.exam_id);
	await new StudentExamDestroy().destroy_by_exam_id(req.body.exam_id);

	return ApiRes(res, {
		status: 204
	});
};

export const update_exam = async (req: Request, res: Response) => {
	const validate = new Validator(
		{
			exam_id: req.body.exam_id,
			title: req.body.title,
			date: req.body.date,
			start_hour: req.body.start_hour,
			end_hour: req.body.end_hour,
			description: req.body.description,
			type: req.body.type,
			color: req.body.color
		},
		{
			exam_id: ['required', 'string'],
			title: ['string'],
			date: ['date'],
			start_hour: ['string'],
			end_hour: ['string'],
			description: ['string'],
			type: ['string', { in: Object.keys(ExamTypeEnum) }],
			color: ['string']
		}
	);

	if (validate.fails()) {
		return new PreconditionFailedError(res, validate.errors.all());
	}

	const result = await new ExamUpdate().update(
		req.body.exam_id,
		req.body.title,
		req.body.date,
		req.body.start_hour,
		req.body.end_hour,
		req.body.description,
		req.body.type,
		req.body.color
	);

	return ApiRes(res, {
		status: result.is_success ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR,
		data: result.data
	});
};

export const get_count_of_exams = async (req: Request, res: Response) => {
	const validate = new Validator(
		{
			start_date: req.query.start_date,
			end_date: req.query.end_date
		},
		{
			start_date: ['required', 'string'],
			end_date: ['required', 'string']
		}
	);

	if (validate.fails()) {
		return new PreconditionFailedError(res, validate.errors.all());
	}

	const result = await new ExamInfo().get_count_of_exam_of_date(
		<string>req.query.start_date,
		<string>req.query.end_date,
		req.user_id
	);

	return ApiRes(res, {
		status: result.is_success ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR,
		data: result.data
	});
};

export const get_all = async (req: Request, res: Response) => {
	const validate = new Validator(
		{
			page: req.query.page,
			limit: req.query.limit,
			class_id: req.query.class_id,
			start_date: req.query.start_date,
			end_date: req.query.end_date,
			student_id: req.query.student_id,
			sort: req.query.sort
		},
		{
			page: ['required', 'numeric'],
			limit: ['required', 'numeric'],
			class_id: ['string'],
			start_date: ['string'],
			end_date: ['string'],
			student_id: ['string'],
			sort: [{ in: ['last_exam', 'first_exam'] }]
		}
	);

	if (validate.fails()) {
		return new PreconditionFailedError(res, validate.errors.all());
	}

	const result = await new ExamClassInfo().get_all(
		Number(req.query.page),
		Number(req.query.limit),
		<string>req.query.class_id,
		req.user_id,
		<string>req.query.start_date,
		<string>req.query.end_date,
		<string>req.query.student_id,
		<string>req.query.sort
	);

	return ApiRes(res, {
		status: result.is_success ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR,
		data: result.data
	});
};

export const get_info = async (req: Request, res: Response) => {
	const validate = new Validator(
		{
			class_id: req.query.class_id,
			exam_id: req.query.exam_id
		},
		{
			class_id: ['required', 'string'],
			exam_id: ['required', 'string']
		}
	);

	if (validate.fails()) {
		return new PreconditionFailedError(res, validate.errors.all());
	}

	const result = await new ExamClassInfo().get_info_by_id(
		<string>req.query.exam_id,
		<string>req.query.class_id
	);

	return ApiRes(res, {
		status: result.is_success ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR,
		data: result.data
	});
};

export const get_avg_exam = async (req: Request, res: Response) => {
	const result = await new StudentExamInfo().get_avg_exam(req.params.exam_id);

	return ApiRes(res, {
		status: result.is_success ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR,
		data: result.data
	});
};

export const get_avg_class = async (req: Request, res: Response) => {
	const result = await new StudentExamInfo().get_avg_class(req.params.class_id);

	return ApiRes(res, {
		status: result.is_success ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR,
		data: result.data
	});
};

export const get_avg_all_class = async (req: Request, res: Response) => {
	const result = await new StudentExamInfo().get_avg_all(req.user_id);

	return ApiRes(res, {
		status: result.is_success ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR,
		data: result.data
	});
};

export const get_avg_student = async (req: Request, res: Response) => {
	const result = await new StudentExamInfo().get_avg_student(req.params.student_id);

	return ApiRes(res, {
		status: result.is_success ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR,
		data: result.data
	});
};

export const add_points = async (req: Request, res: Response) => {
	const validate = new Validator(
		{
			exam_id: req.body.exam_id,
			student_id: req.body.student_id,
			points: req.body.points
		},
		{
			exam_id: ['required', 'string'],
			student_id: ['required', 'string'],
			points: ['required', 'numeric']
		}
	);

	if (validate.fails()) {
		return new PreconditionFailedError(res, validate.errors.all());
	}

	const result = await new StudentExamUpdate().add_points(
		req.body.exam_id,
		req.body.student_id,
		req.body.points
	);

	return ApiRes(res, {
		status: result.is_success ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR,
		data: result.data
	});
};

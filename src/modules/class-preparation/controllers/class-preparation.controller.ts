import { Response, Request } from 'express';
import Validator from 'validatorjs';
import { PreconditionFailedError } from '../../../lib/http/error/precondition_failed.error';
import { ClassPreparationBuilder } from '../methods/class-preparation/class_preparation.builder';
import { ClassPreparationAssignCreate } from '../methods/class-preparation-assign/class_preparation_assign_create';
import { InternalServerError } from '../../../lib/http/error/internal_server.error';
import { ApiRes } from '../../../lib/http/api_response';
import { ClassPreparationAssignDestroy } from '../methods/class-preparation-assign/class_preparation_assign_destroy';
import { ClassPreparationDestroy } from '../methods/class-preparation/class-preparation_destroy';
import { ClassPreparationAssignInfo } from '../methods/class-preparation-assign/class_preparation_assign_info';
import { ClassPreparationUpdate } from '../methods/class-preparation/class-preparation_update';

export const create = async (req: Request, res: Response) => {
	const validate = new Validator(
		{
			date: req.body.date,
			preparation_id: req.body.preparation_id,
			classes_id: req.body.classes_id
		},
		{
			preparation_id: ['required', 'string'],
			classes_id: ['required', 'array']
		}
	);

	if (validate.fails()) {
		return new PreconditionFailedError(res, validate.errors.all());
	}

	const result = await new ClassPreparationBuilder()
		.setDate(req.body.date)
		.setPreparationId(req.body.preparation_id)
		.setTeacherId(req.user_id)
		.build();

	if (req.body.classes_id && req.body.classes_id.length > 0) {
		for (let i = 0; i < req.body.classes_id.length; i++) {
			const assign = await new ClassPreparationAssignCreate().create(req.body.classes_id[i], result.data.id);
			if (!assign.is_success) return new InternalServerError(res);
		}
	}

	return ApiRes(res, {
		status: 200,
		data: result.data
	});
};

export const add_objectives = async (req: Request, res: Response) => {
	const validate = new Validator(
		{
			id: req.body.id,
			knowledge_objectives: req.body.knowledge_objectives,
			skill_objectives: req.body.skill_objectives,
			emotional_objectives: req.body.emotional_objectives
		},
		{
			id: ['required', 'string'],
			knowledge_objectives: ['string'],
			skill_objectives: ['string'],
			emotional_objectives: ['string']
		}
	);

	if (validate.fails()) {
		return new PreconditionFailedError(res, validate.errors.all());
	}

	const result = await new ClassPreparationUpdate().add_objectives(
		req.body.id,
		req.body.knowledge_objectives,
		req.body.skill_objectives,
		req.body.emotional_objectives,
		req.user_id
	);

	return ApiRes(res, { status: result.is_success ? 200 : 500 });
};

export const add_skills = async (req: Request, res: Response) => {
	const validate = new Validator(
		{
			id: req.body.id,
			teaching_aids: req.body.teaching_aids,
			acquired_skills: req.body.acquired_skills
		},
		{
			id: ['required', 'string'],
			teaching_aids: ['string'],
			acquired_skills: ['string']
		}
	);

	if (validate.fails()) {
		return new PreconditionFailedError(res, validate.errors.all());
	}

	const result = await new ClassPreparationUpdate().add_skills(
		req.body.id,
		req.body.teaching_aids,
		req.body.acquired_skills,
		req.user_id
	);

	return ApiRes(res, { status: result.is_success ? 200 : 500 });
};

export const add_apply = async (req: Request, res: Response) => {
	const validate = new Validator(
		{
			id: req.body.id,
			present: req.body.present,
			apply: req.body.apply,
			value_and_expand: req.body.value_and_expand
		},
		{
			id: ['required', 'string'],
			present: ['string'],
			apply: ['string'],
			value_and_expand: ['string']
		}
	);

	if (validate.fails()) {
		return new PreconditionFailedError(res, validate.errors.all());
	}

	const result = await new ClassPreparationUpdate().add_apply(
		req.body.id,
		req.body.present,
		req.body.apply,
		req.body.value_and_expand,
		req.user_id
	);

	return ApiRes(res, { status: result.is_success ? 200 : 500 });
};

export const destroy = async (req: Request, res: Response) => {
	const validate = new Validator(
		{
			class_preparation_id: req.body.class_preparation_id,
			class_id: req.body.class_id
		},
		{
			class_preparation_assign_id: ['required', 'string'],
			class_id: ['required', 'string']
		}
	);

	if (validate.fails()) {
		return new PreconditionFailedError(res, validate.errors.all());
	}
	await new ClassPreparationDestroy().destroy(req.body.class_preparation_id, req.user_id);
	await new ClassPreparationAssignDestroy().destroy_by_class_id(req.body.class_id);

	return ApiRes(res, {
		status: 204
	});
};

export const get_all = async (req: Request, res: Response) => {
	const validate = new Validator(
		{
			limit: req.query.limit,
			page: req.query.page,
			start_date: req.query.start_date,
			end_date: req.query.end_date,
			class_id: req.query.class_id
		},
		{
			limit: ['numeric', 'required'],
			page: ['numeric', 'required'],
			start_date: ['string'],
			end_date: ['string'],
			class_id: ['string']
		}
	);

	if (validate.fails()) {
		return new PreconditionFailedError(res, validate.errors.all());
	}

	const result = await new ClassPreparationAssignInfo().get_all(
		Number(req.query.page),
		Number(req.query.limit),
		req.user_id,
		<string>req.query.start_date,
		<string>req.query.end_date,
		<string>req.query.class_id
	);

	return ApiRes(res, {
		status: 200,
		data: result.data
	});
};

export const get_info = async (req: Request, res: Response) => {
	const result = await new ClassPreparationAssignInfo().get_info(
		req.params.class_preparation_id,
		req.user_id
	);
	return ApiRes(res, {
		status: result.is_success ? 200 : 500,
		data: result.data
	});
};

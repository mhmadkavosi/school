import { Response, Request } from 'express';
import Validator from 'validatorjs';
import { PreconditionFailedError } from '../../../lib/http/error/precondition_failed.error';
import { ClassPreparationBuilder } from '../methods/class-preparation/class_preparation.builder';
import { ClassPreparationAssignCreate } from '../methods/class-preparation-assign/class_preparation_assign_create';
import { InternalServerError } from '../../../lib/http/error/internal_server.error';
import { ApiRes } from '../../../lib/http/api_response';
import { ClassPreparationUpdate } from '../methods/class-preparation/class-preparation_update';
import { ClassPreparationAssignDestroy } from '../methods/class-preparation-assign/class_preparation_assign_destroy';
import { ClassPreparationDestroy } from '../methods/class-preparation/class-preparation_destroy';
import { ClassPreparationAssignInfo } from '../methods/class-preparation-assign/class_preparation_assign_info';
export const create = async (req: Request, res: Response) => {
	const validate = new Validator(
		{
			date: req.body.date,
			subject: req.body.subject,
			knowledge_objectives: req.body.knowledge_objectives,
			skill_objectives: req.body.skill_objectives,
			emotional_objectives: req.body.emotional_objectives,
			teaching_aids: req.body.teaching_aids,
			acquired_skills: req.body.acquired_skills,
			present: req.body.present,
			apply: req.body.apply,
			value_and_expand: req.body.value_and_expand,
			classes_id: req.body.classes_id
		},
		{
			subject: ['required', 'string'],
			date: ['required', 'date'],
			knowledge_objectives: ['string'],
			skill_objectives: ['string'],
			emotional_objectives: ['string'],
			teaching_aids: ['string'],
			acquired_skills: ['string'],
			present: ['string'],
			apply: ['string'],
			value_and_expand: ['string'],
			classes_id: ['required', 'array']
		}
	);

	if (validate.fails()) {
		return new PreconditionFailedError(res, validate.errors.all());
	}

	const result = await new ClassPreparationBuilder()
		.setAcquiredSkills(req.body.acquired_skills)
		.setApply(req.body.apply)
		.setDate(req.body.date)
		.setEmotionalObjectives(req.body.emotional_objectives)
		.setPresent(req.body.present)
		.setSkillObjectives(req.body.skill_objectives)
		.setSubject(req.body.subject)
		.setTeacherId(req.user_id)
		.setTeachingAids(req.body.teaching_aids)
		.setValueAndExpand(req.body.value_and_expand)
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

export const update = async (req: Request, res: Response) => {
	const validate = new Validator(
		{
			id: req.body.id,
			date: req.body.date,
			subject: req.body.subject,
			knowledge_objectives: req.body.knowledge_objectives,
			skill_objectives: req.body.skill_objectives,
			emotional_objectives: req.body.emotional_objectives,
			teaching_aids: req.body.teaching_aids,
			acquired_skills: req.body.acquired_skills,
			present: req.body.present,
			apply: req.body.apply,
			value_and_expand: req.body.value_and_expand,
			classes_id: req.body.classes_id
		},
		{
			id: ['required', 'string'],
			subject: ['string'],
			date: ['date'],
			knowledge_objectives: ['string'],
			skill_objectives: ['string'],
			emotional_objectives: ['string'],
			teaching_aids: ['string'],
			acquired_skills: ['string'],
			present: ['string'],
			apply: ['string'],
			value_and_expand: ['string']
		}
	);

	if (validate.fails()) {
		return new PreconditionFailedError(res, validate.errors.all());
	}

	const result = await new ClassPreparationUpdate().update(
		req.body.id,
		req.body.date,
		req.body.subject,
		req.body.knowledge_objectives,
		req.body.skill_objectives,
		req.body.emotional_objectives,
		req.body.teaching_aids,
		req.body.acquired_skills,
		req.body.present,
		req.body.apply,
		req.body.value_and_expand,
		req.user_id
	);

	return ApiRes(res, {
		status: result.is_success ? 200 : 500
	});
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

import { Request, Response } from 'express';
import Validator from 'validatorjs';
import { PreconditionFailedError } from '../../../lib/http/error/precondition_failed.error';
import { PreparationBuilder } from '../methods/preparation/preparation.builder';
import { ApiRes } from '../../../lib/http/api_response';
import { HttpStatus } from '../../../lib/http/http_status';
import { PreparationPlanBuilder } from '../methods/preparation_plan/preparation_plan.builder';
import { PreparationInfo } from '../methods/preparation/preparation_info';
import { PreparationDestroy } from '../methods/preparation/preparation_delete';
import { PreparationPlanDestroy } from '../methods/preparation_plan/preparation_plan_delete';

export const preparation_create = async (req: Request, res: Response) => {
	const validate = new Validator(
		{
			preparation_year_start: req.body.preparation_year_start,
			preparation_year_end: req.body.preparation_year_end,
			subject: req.body.subject,
			class_level_id: req.body.class_level_id,
			grade: req.body.grade,
			semester: req.body.semester,
			part: req.body.part,
			season: req.body.season
		},
		{
			preparation_year_start: ['required', 'string'],
			preparation_year_end: ['required', 'string'],
			subject: ['required', 'string'],
			class_level_id: ['required', 'string'],
			grade: ['required', 'string'],
			semester: ['required', 'string'],
			part: ['required', 'string']
		}
	);

	if (validate.fails()) {
		return new PreconditionFailedError(res, validate.errors.all());
	}

	const result = await new PreparationBuilder()
		.setClassLevelId(req.body.class_level_id)
		.setGrade(req.body.grade)
		.setPreparationYearStart(req.body.preparation_year_start)
		.setPreparationYearEnd(req.body.preparation_year_end)
		.setSubject(req.body.subject)
		.setSemester(req.body.semester)
		.setPart(req.body.part)
		.build();

	return ApiRes(res, {
		status: result.is_success ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR,
		data: result.data
	});
};

export const preparation_update = async (req: Request, res: Response) => {
	const validate = new Validator(
		{
			preparation_year_start: req.body.preparation_year_start,
			preparation_year_end: req.body.preparation_year_end,
			subject: req.body.subject,
			class_level_id: req.body.class_level_id,
			grade: req.body.grade,
			semester: req.body.semester,
			part: req.body.part,
			season: req.body.season,
			id: req.body.id
		},
		{
			id: ['required', 'string'],
			preparation_year_start: ['string'],
			preparation_year_end: ['string'],
			subject: ['string'],
			class_level_id: ['string'],
			grade: ['string'],
			semester: ['string'],
			part: ['string']
		}
	);

	if (validate.fails()) {
		return new PreconditionFailedError(res, validate.errors.all());
	}

	const result = await new PreparationBuilder()
		.setId(req.body.id)
		.setClassLevelId(req.body.class_level_id)
		.setGrade(req.body.grade)
		.setPreparationYearStart(req.body.preparation_year_start)
		.setPreparationYearEnd(req.body.preparation_year_end)
		.setSubject(req.body.subject)
		.setSemester(req.body.semester)
		.setPart(req.body.part)
		.update();

	return ApiRes(res, {
		status: result.is_success ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR,
		data: result.data
	});
};

export const destroy_preparation = async (req: Request, res: Response) => {
	const validate = new Validator(
		{
			preparation_id: req.body.preparation_id
		},
		{
			preparation_id: ['required', 'string']
		}
	);

	if (validate.fails()) {
		return new PreconditionFailedError(res, validate.errors.all());
	}
	// TODO : delete assoieted models
	await new PreparationDestroy().destroy(req.body.preparation_id);
	await new PreparationPlanDestroy().destroy_preparation_id(req.body.preparation_id);

	return ApiRes(res, {
		status: 204
	});
};

export const add_plan = async (req: Request, res: Response) => {
	const validate = new Validator(
		{
			week_number: req.body.week_number,
			field: req.body.field,
			basic_concept: req.body.basic_concept,
			number_of_class: req.body.number_of_class,
			preparation_id: req.body.preparation_id,
			subject: req.body.subject,
			season: req.body.season,
			notes: req.body.notes
		},
		{
			week_number: ['required', 'numeric'],
			field: ['required', 'string'],
			basic_concept: ['required', 'string'],
			number_of_class: ['required', 'numeric'],
			preparation_id: ['required', 'string'],
			subject: ['required', 'string'],
			season: ['required', 'string'],
			notes: ['required', 'string']
		}
	);

	if (validate.fails()) {
		return new PreconditionFailedError(res, validate.errors.all());
	}

	const result = await new PreparationPlanBuilder()
		.setWeekNumber(req.body.week_number)
		.setField(req.body.field)
		.setBasicConcept(req.body.basic_concept)
		.setNumberOfClass(req.body.number_of_class)
		.setPreparationId(req.body.preparation_id)
		.setSeason(req.body.season)
		.setSubject(req.body.subject)
		.setNotes(req.body.notes)
		.build();

	return ApiRes(res, {
		status: result.is_success ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR,
		data: result.data
	});
};

export const plan_update = async (req: Request, res: Response) => {
	const validate = new Validator(
		{
			plan_id: req.body.plan_id,
			week_number: req.body.week_number,
			field: req.body.field,
			basic_concept: req.body.basic_concept,
			number_of_class: req.body.number_of_class,
			preparation_id: req.body.preparation_id,
			subject: req.body.subject,
			season: req.body.season,
			notes: req.body.notes
		},
		{
			plan_id: ['required', 'string'],
			week_number: ['numeric'],
			field: ['string'],
			basic_concept: ['string'],
			number_of_class: ['numeric'],
			preparation_id: ['string'],
			subject: ['string'],
			season: ['string'],
			notes: ['string']
		}
	);

	if (validate.fails()) {
		return new PreconditionFailedError(res, validate.errors.all());
	}

	const result = await new PreparationPlanBuilder()
		.setId(req.body.plan_id)
		.setWeekNumber(req.body.week_number)
		.setField(req.body.field)
		.setBasicConcept(req.body.basic_concept)
		.setNumberOfClass(req.body.number_of_class)
		.setPreparationId(req.body.preparation_id)
		.setSeason(req.body.season)
		.setSubject(req.body.subject)
		.setNotes(req.body.notes)
		.update();

	return ApiRes(res, {
		status: result.is_success ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR,
		data: result.data
	});
};

export const destroy_plan = async (req: Request, res: Response) => {
	const validate = new Validator(
		{
			plan_id: req.body.plan_id
		},
		{
			plan_id: ['required', 'string']
		}
	);

	if (validate.fails()) {
		return new PreconditionFailedError(res, validate.errors.all());
	}
	// TODO : delete assoieted models
	await new PreparationPlanDestroy().destroy(req.body.plan_id);

	return ApiRes(res, {
		status: 204
	});
};

export const get_all = async (req: Request, res: Response) => {
	const validate = new Validator(
		{
			start: req.query.start,
			end: req.query.end,
			class_level_id: req.query.class_level_id
		},
		{
			start: ['string'],
			end: ['string'],
			class_level_id: ['string']
		}
	);

	if (validate.fails()) {
		return new PreconditionFailedError(res, validate.errors.all());
	}

	const result = await new PreparationInfo().get_by_preparation_year(
		<string>req.query.start,
		<string>req.query.end,
		<string>req.query.class_level_id
	);

	return ApiRes(res, {
		status: result.is_success ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR,
		data: result.data
	});
};

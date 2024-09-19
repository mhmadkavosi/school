import { Response, Request } from 'express';
import { ApiRes } from '../../../lib/http/api_response';
import Validator from 'validatorjs';
import { WeekDays } from '../models/enums/week_days.enum';
import { getTimeMinutes, isValidTime } from '../../../utils/time.utility';
import { ClassTimingCreate } from '../methods/class_timing/class_timing_create';
import { ClassTimingInfo } from '../methods/class_timing/class_timing_info';
import { ClassTimingUpdate } from '../methods/class_timing/class_timing_update';
import { ClassTimingDestroy } from '../methods/class_timing/class_timing_destroy';
export const create = async (req: Request, res: Response) => {
	const data = req.body.class_timings;

	if (!data && !req.body.class_id) {
		return ApiRes(res, {
			status: 500,
			msg: 'No data in body'
		});
	}

	for (let i = 0; i < data.length; i++) {
		const validate = new Validator(
			{
				day: data[i].day,
				start_hour: data[i].start_hour,
				finish_hour: data[i].finish_hour
			},
			{
				day: ['required', 'string', { in: Object.values(WeekDays) }],
				start_hour: ['string', 'min:5', 'max:5'],
				finish_hour: ['string', 'min:5', 'max:5']
			}
		);

		if (validate.fails()) {
			return ApiRes(res, {
				status: 412,
				msg: 'validation error',
				data: validate.errors.all()
			});
		}

		let timeValidation = '';
		!!data[i].start_hour &&
			!isValidTime(data[i].start_hour) &&
			(timeValidation = `start hour am: ${data[i].start_hour} is not valid time format`);

		!!data[i].finish_hour &&
			!isValidTime(data[i].finish_hour) &&
			(timeValidation = `finish hour am: ${data[i].finish_hour} is not valid time format`);

		if (timeValidation !== '')
			return ApiRes(res, {
				status: 412,
				msg: 'validation error',
				data: `${timeValidation} is not valid time format`
			});

		if (!!data[i].start_hour && getTimeMinutes(data[i].start_hour) >= getTimeMinutes(data[i].finish_hour))
			return ApiRes(res, {
				status: 412,
				msg: 'validation error',
				data: 'start hour must be less than finish hour'
			});

		if (
			!!data[i].start_hour_pm &&
			!!data[i].finish_hour &&
			getTimeMinutes(data[i].finish_hour) >= getTimeMinutes(data[i].start_hour_pm)
		)
			return ApiRes(res, {
				status: 412,
				msg: 'validation error',
				data: 'finish hour must be less than start hour'
			});

		const result = await new ClassTimingCreate().create(
			req.body.class_id,
			data[i].day,
			data[i].start_hour,
			data[i].finish_hour
		);

		if (!result.is_success) {
			return ApiRes(res, {
				status: 500,
				msg: result.msg
			});
		}
	}

	return ApiRes(res, {
		status: 200
	});
};

export const get_all = async (req: Request, res: Response) => {
	const result = await new ClassTimingInfo().get_all_by_class_id(req.params.class_id);

	return ApiRes(res, {
		status: result.is_success ? 200 : 500,
		data: result.data
	});
};

export const get_info = async (req: Request, res: Response) => {
	const result = await new ClassTimingInfo().get_info_by_id(req.params.class_timing_id);

	return ApiRes(res, {
		status: result.is_success ? 200 : 500,
		data: result.data
	});
};

export const update = async (req: Request, res: Response) => {
	const validate = new Validator(
		{
			class_timing_id: req.body.class_timing_id,
			day: req.body.day,
			start_hour: req.body.start_hour,
			finish_hour: req.body.finish_hour
		},
		{
			class_timing_id: ['required', 'string'],
			day: ['required', 'string', { in: Object.values(WeekDays) }],
			start_hour: ['string', 'min:5', 'max:5'],
			finish_hour: ['string', 'min:5', 'max:5']
		}
	);

	if (validate.fails()) {
		return ApiRes(res, {
			status: 412,
			msg: 'validation error',
			data: validate.errors.all()
		});
	}

	let timeValidation = '';
	!!req.body.start_hour &&
		!isValidTime(req.body.start_hour) &&
		(timeValidation = `start hour am: ${req.body.start_hour} is not valid time format`);

	!!req.body.finish_hour &&
		!isValidTime(req.body.finish_hour) &&
		(timeValidation = `finish hour am: ${req.body.finish_hour} is not valid time format`);

	if (timeValidation !== '')
		return ApiRes(res, {
			status: 412,
			msg: 'validation error',
			data: `${timeValidation} is not valid time format`
		});

	if (!!req.body.start_hour && getTimeMinutes(req.body.start_hour) >= getTimeMinutes(req.body.finish_hour))
		return ApiRes(res, {
			status: 412,
			msg: 'validation error',
			data: 'start hour must be less than finish hour'
		});

	if (
		!!req.body.start_hour_pm &&
		!!req.body.finish_hour &&
		getTimeMinutes(req.body.finish_hour) >= getTimeMinutes(req.body.start_hour_pm)
	)
		return ApiRes(res, {
			status: 412,
			msg: 'validation error',
			data: 'finish hour must be less than start hour'
		});

	const result = await new ClassTimingUpdate().update(
		req.body.class_timing_id,
		req.body.day,
		req.body.start_hour,
		req.body.finish_hour
	);

	return ApiRes(res, {
		status: result.is_success ? 200 : 500
	});
};

export const destroy = async (req: Request, res: Response) => {
	const validate = new Validator(
		{
			class_timing_id: req.body.class_timing_id
		},
		{
			class_timing_id: ['required', 'string']
		}
	);

	if (validate.fails()) {
		return ApiRes(res, {
			status: 412,
			msg: 'validation error',
			data: validate.errors.all()
		});
	}

	const result = await new ClassTimingDestroy().destroy(req.body.class_timing_id);

	return ApiRes(res, {
		status: result.is_success ? 204 : 500
	});
};

export const get_class_time = async (req: Request, res: Response) => {
	const validate = new Validator(
		{
			class_id: req.query.class_id,
			day: req.query.day
		},
		{
			class_id: ['string'],
			day: ['string', { in: Object.keys(WeekDays) }]
		}
	);

	if (validate.fails()) {
		return ApiRes(res, {
			status: 412,
			msg: 'validation error',
			data: validate.errors.all()
		});
	}

	const result = await new ClassTimingInfo().get_class_time(
		<string>req.query.class_id,
		<string>req.query.day,
		req.user_id
	);

	return ApiRes(res, {
		status: result.is_success ? 200 : 500,
		data: result.data
	});
};

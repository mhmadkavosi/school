import { Request, Response } from 'express';

import Validator from 'validatorjs';
import { ApiRes } from '../../../lib/http/api_response';
import { WeekDays } from '../models/enums/week_days.enum';
import { ClassTimingInfo } from '../methods/class_timing/class_timing_info';

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

	const result = await new ClassTimingInfo().get_class_time_admin(
		<string>req.query.class_id,
		<string>req.query.day
	);

	return ApiRes(res, {
		status: result.is_success ? 200 : 500,
		data: result.data
	});
};

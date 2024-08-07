import { Request, Response } from 'express';
import { TeacherTokenRemove } from '../methods/teacher/teacher_token_remove';
import { ApiRes } from '../../../lib/http/api_response';
import { HttpStatus } from '../../../lib/http/http_status';

export const logout = async (req: Request, res: Response) => {
	const result = await new TeacherTokenRemove().remove_teacher_token_by_teacher_id_and_token_id(
		req.token_id,
		req.user_id
	);

	return ApiRes(res, <RestApi.ResInterface>{
		status: result.is_success ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR
	});
};

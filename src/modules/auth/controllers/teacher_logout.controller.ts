import { Request, Response } from 'express';
import { TeacherTokenRemove } from '../methods/teacher/teacher_token_remove';
import { ApiRes } from '../../../lib/http/api_response';
import { HttpStatus } from '../../../lib/http/http_status';
import { LogCreate } from '../../log/methods/logs_create';
import { LogTitleEnum } from '../../log/models/enums/log_title.enum';
import { LogTypeEnum } from '../../log/models/enums/log_type.eum';
import { get_user_agent } from '../../../utils/user_agent.utility';

export const logout = async (req: Request, res: Response) => {
	const result = await new TeacherTokenRemove().remove_teacher_token_by_teacher_id_and_token_id(
		req.token_id,
		req.user_id
	);
	if (result.is_success) {
		const user_agent = get_user_agent(req);
		await new LogCreate().createLog(
			'teacher',
			LogTitleEnum.logout,
			LogTypeEnum.LOGOUT,
			<string>user_agent.ip,
			user_agent.browser ?? 'NA',
			req.user_id
		);
	}
	return ApiRes(res, <RestApi.ResInterface>{
		status: result.is_success ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR
	});
};

import * as AttendanceReasonController from '../controllers/attendance_reason.controller';
import { Router } from 'express';

const AttendanceReasonRouter: Router = Router();

const route_prefix = '/attendance-reason';

AttendanceReasonRouter.get(`${route_prefix}`, AttendanceReasonController.get_all);
AttendanceReasonRouter.get(
	`${route_prefix}/:attendance_reason_id/info`,
	AttendanceReasonController.get_info_by_id
);
AttendanceReasonRouter.post(`${route_prefix}`, AttendanceReasonController.create_attendance_reason);

export default AttendanceReasonRouter;

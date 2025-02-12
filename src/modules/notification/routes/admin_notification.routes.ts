import { AdminAuthMiddleware } from '../../../middlewares/admin_auth.middleware';
import * as AdminNotificationController from '../controllers/admin/admin_notification.controller';
import { Router } from 'express';

const AdminNotificationRouter: Router = Router();

const route_prefix = '/admin/notification';

AdminNotificationRouter.get(
	`${route_prefix}/total`,
	AdminAuthMiddleware,
	AdminNotificationController.get_total
);

AdminNotificationRouter.get(
	`${route_prefix}/total/category`,
	AdminAuthMiddleware,
	AdminNotificationController.get_total_by_category
);

AdminNotificationRouter.post(
	`${route_prefix}`,
	AdminAuthMiddleware,
	AdminNotificationController.notification_create
);

AdminNotificationRouter.put(
	`${route_prefix}`,
	AdminAuthMiddleware,
	AdminNotificationController.notification_update
);

AdminNotificationRouter.delete(
	`${route_prefix}`,
	AdminAuthMiddleware,
	AdminNotificationController.notification_destroy
);

AdminNotificationRouter.get(
	`${route_prefix}`,
	AdminAuthMiddleware,
	AdminNotificationController.notification_get_all
);

export default AdminNotificationRouter;

import Mongo from '../../../config/mongodb.config';
import { BaseLogSchema } from './base_logs.model';

export const AdminLogModel = Mongo.instance().model('admin_logs', BaseLogSchema);

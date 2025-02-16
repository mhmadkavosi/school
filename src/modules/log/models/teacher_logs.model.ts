import Mongo from '../../../config/mongodb.config';
import { BaseLogSchema } from './base_logs.model';

export const TeacherLogModel = Mongo.instance().model('teacher_logs', BaseLogSchema);

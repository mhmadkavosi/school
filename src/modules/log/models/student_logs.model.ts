import Mongo from '../../../config/mongodb.config';
import { BaseLogSchema } from './base_logs.model';

export const StudentLogModel = Mongo.instance().model('student_logs', BaseLogSchema);

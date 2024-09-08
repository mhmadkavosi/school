import { Schema } from 'mongoose';
import { LogTypeEnum } from './enums/log_type_enum';
import Mongo from '../../../config/mongodb.config';

const LogReportSchema = new Schema(
	{
		log_type: {
			type: String,
			required: true,
			enum: LogTypeEnum
		},
		log_message: {
			type: String,
			required: true
		},
		log_location: {
			type: String,
			default: null,
			required: true
		}
	},
	{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);
// export const LogReportModel = Mongo.instance().model('logs', LogReportSchema);

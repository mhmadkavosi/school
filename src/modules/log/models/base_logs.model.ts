import { Schema } from 'mongoose';
import { LogTypeEnum } from './enums/log_type.eum';

export const BaseLogSchema = new Schema(
	{
		title: {
			type: String,
			required: true
		},
		user_id: {
			type: String,
			required: true
		},
		type: {
			type: String,
			required: true,
			enum: LogTypeEnum
		},
		ip: {
			type: String,
			required: true
		},
		device: {
			type: String,
			required: true
		}
	},
	{ timestamps: { createdAt: 'created_at', updatedAt: false } }
);

import { AppLogger } from '../../../../lib/logger/Logger';
import SectionModel from '../../../school/models/section.model';
import ClassLevelModel from '../../models/class_level.model';

export class ClassLevelInfo {
	async get_all(): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await ClassLevelModel.findAll({
				where: { is_active: true },
				include: [{ model: SectionModel }]
			});

			return {
				is_success: true,
				data: result
			};
		} catch (error) {
			AppLogger.error('Error in ClassLevelInfo get_all', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}

	async get_all_by_section_id(section_id: string): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await ClassLevelModel.findAll({
				where: { is_active: true, section_id },
				include: [{ model: SectionModel }]
			});

			return {
				is_success: true,
				data: result
			};
		} catch (error) {
			AppLogger.error('Error in ClassLevelInfo get_all', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}

	async get_info_by_id(id: string): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await ClassLevelModel.findAll({ where: { id }, include: [{ model: SectionModel }] });

			return {
				is_success: !!result,
				data: result
			};
		} catch (error) {
			AppLogger.error('Error in ClassLevelInfo get_info_by_id', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}
}

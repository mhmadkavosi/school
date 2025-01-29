import { AppLogger } from '../../../../lib/logger/Logger';
import AdminModel from '../../models/admin.model';
import { paginate } from '../../../../utils/paginate.utility';
import { Op } from 'sequelize';

export class AdminInfo {
	/**
	 *
	 * @param email
	 */
	async get_by_email(email: string): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await AdminModel.findOne({ where: { email: email } });

			return {
				is_success: !!result,
				data: result
			};
		} catch (error) {
			AppLogger.error('Error in AdminInfo get_info_user_by_email', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}

	/**
	 *
	 * @param national_code
	 */
	async get_by_national_code(national_code: string): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await AdminModel.findOne({ where: { national_code: national_code } });

			return {
				is_success: !!result,
				data: result
			};
		} catch (error) {
			AppLogger.error('Error in AdminInfo get_info_user_by_national_code', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}

	/**
	 *
	 * @param id
	 */
	async get_password_by_id(id: string): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await AdminModel.findOne({ where: { id: id }, attributes: ['password'] });

			return {
				is_success: !!result,
				data: result
			};
		} catch (error) {
			AppLogger.error('Error in AdminInfo get_password_by_id', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}

	/**
	 *
	 * @param id
	 */
	async get_by_id(id: string): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await AdminModel.findOne({
				where: { id: id }
			});

			return {
				is_success: !!result,
				data: result
			};
		} catch (error) {
			AppLogger.error('Error in AdminInfo get_by_id', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}

	/**
	 *
	 * @param page
	 * @param limit
	 * @param national_code
	 * @param name
	 * @param family
	 *
	 */
	async get_all_admins(
		page: number,
		limit: number,
		national_code: string,
		name: string,
		family: string,
		email: string
	): Promise<RestApi.ObjectResInterface> {
		try {
			const skip = (page - 1) * limit;
			const match: any = [];

			if (!!national_code) {
				match.push({
					national_code: {
						[Op.like]: `%${national_code}%`
					}
				});
			}
			if (!!email) {
				match.push({
					email: {
						[Op.like]: `%${email}%`
					}
				});
			}

			if (!!name) {
				match.push({
					name: {
						[Op.like]: `%${name}%`
					}
				});
			}

			if (!!family) {
				match.push({
					family: {
						[Op.like]: `%${family}%`
					}
				});
			}

			const result = await AdminModel.findAndCountAll({
				where: { [Op.and]: match },
				distinct: true,
				limit: limit,
				offset: skip,
				attributes: ['id', 'national_code', 'name', 'family', 'is_active', 'created_at', 'updated_at'],
				order: [['created_at', 'ASC']]
			});

			return {
				is_success: true,
				data: paginate(page, limit, result)
			};
		} catch (error) {
			AppLogger.error('Error in AdminInfo get_all_admins', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}
}

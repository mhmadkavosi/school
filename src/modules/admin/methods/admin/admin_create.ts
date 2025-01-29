import { AppLogger } from '../../../../lib/logger/Logger';
import AdminModel from '../../models/admin.model';
import { AdminBuilder } from './admin.builder';

export class AdminCreate {
	/**
	 *
	 * @param builder
	 */
	async save(builder: AdminBuilder): Promise<RestApi.ObjectResInterface> {
		try {
			const result = await AdminModel.create(
				{
					national_code: builder.getNationalCode(),
					name: builder.getName(),
					family: builder.getFamily(),
					password: builder.getPassword(),
					email: builder.getEmail()
				},
				{
					isNewRecord: true
				}
			);

			return {
				is_success: !!result,
				data: result,
				msg: 'created successful'
			};
		} catch (error) {
			AppLogger.error('Error in AdminCreate save', error);
			return {
				is_success: false,
				msg: 'Internal Server Error'
			};
		}
	}
}

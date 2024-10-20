import { createTransport } from 'nodemailer';
import { MailProviderAbstract } from './mail_provider.abstract';

export class ZohoProvider extends MailProviderAbstract {
	public readonly provider_name = 'zhoho';

	constructor() {
		super();
		this.transporter = createTransport({
			host: 'smtp.liara.ir',
			port: 587,
			secure: false,
			auth: {
				user: 'xenodochial_shaw_ggi8q5',
				pass: '6a412d1e-ed08-4853-b8a0-50337a1acb7e'
			}
		});
	}
}

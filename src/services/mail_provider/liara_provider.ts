import { createTransport } from 'nodemailer';
import { MailProviderAbstract } from './mail_provider.abstract';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

export class ZohoProvider extends MailProviderAbstract {
	public readonly provider_name = 'liara';

	constructor() {
		super();
		this.transporter = createTransport({
			host: 'smtp.c1.liara.email',
			port: 587,
			secure: false,
			auth: {
				user: 'xenodochial_shaw_ggi8q5',
				pass: '6a412d1e-ed08-4853-b8a0-50337a1acb7e'
			}
		});
	}

	protected isEmailSentSuccess(response: SMTPTransport.SentMessageInfo): boolean {
		return response.response.includes('250 Message queued.');
	}
}

import Mail from 'nodemailer/lib/mailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { createTransport } from 'nodemailer';
import { AppLogger } from '../lib/logger/Logger';

export class EmailProvider {
	private transporter: Mail<SMTPTransport.SentMessageInfo>;

	constructor() {
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

	/**
	 * Handle send sms and save report on db
	 * return : number
	 */
	async send_email(to: string, subject: string, template_name: string, context: any): Promise<boolean> {
		try {
			const send_mail = await this.transporter.sendMail({
				from: 'info@mail.autospotify.com',
				to: to,
				subject: subject,
				text: `Hello welcome this is your code : ${context}`
			});

			return send_mail.response == '250 Message queued.';
		} catch (e) {
			AppLogger.error('error in EmailProvider:send_email', e);
			return false;
		}
	}
}

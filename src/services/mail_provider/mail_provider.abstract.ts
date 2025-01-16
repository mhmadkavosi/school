import Mail from 'nodemailer/lib/mailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import fs from 'fs/promises';
import path from 'path';
import Handlebars from 'handlebars';
import { AppLogger } from '../../lib/logger/Logger';

export abstract class MailProviderAbstract {
	protected transporter: Mail<SMTPTransport.SentMessageInfo> | undefined;

	protected abstract isEmailSentSuccess(response: SMTPTransport.SentMessageInfo): boolean;

	/**
	 * Handle send email and save report on db
	 * @param to
	 * @param subject
	 * @param template_name
	 * @param context
	 * @return boolean
	 */
	async send_email(to: string, subject: string, template_name: string, context?: object): Promise<boolean> {
		try {
			const templatePath = path.resolve(`./src/public/mails/${template_name}.handlebars`);
			const emailTemplate = await fs.readFile(templatePath, 'utf-8');

			// Handlebars.registerHelper("I18n", (str) => {
			//   return translate("en", str);
			// });

			const template = Handlebars.compile(emailTemplate);
			const mailOptions = {
				from: 'info@mail.autospotify.com',
				to: to,
				subject: subject,
				html: template(context)
			};

			if (this.transporter) {
				const sendMailResult = await this.transporter.sendMail(mailOptions);

				return this.isEmailSentSuccess(sendMailResult);
			} else {
				return false;
			}
		} catch (e) {
			AppLogger.error('Error in MailProviderAbstract:send_email', e);
			return false;
		}
	}
}

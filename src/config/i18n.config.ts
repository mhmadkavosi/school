import { ConfigurationOptions } from 'i18n';
import { AppLogger } from '../lib/logger/Logger';

const I18nConfig: ConfigurationOptions = {
	locales: ['en', 'ar', 'fa'],

	// you may alter a site wide default locale
	defaultLocale: 'en',

	// will return translation from defaultLocale in case current locale doesn't provide it
	retryInDefaultLocale: false,

	header: 'accept-language',

	// where to store json files - defaults to './locales' relative to modules directory
	directory: 'src/public/locales',

	// control mode on directory creation - defaults to NULL which defaults to umask of process user. Setting has no effect on win.
	directoryPermissions: '755',

	// watch for changes in JSON files to reload locale on updates - defaults to false
	autoReload: true,

	// setting extension of json files - defaults to '.json' (you might want to set this to '.js' according to webtranslateit)
	extension: '.json',

	// setting of log level DEBUG - default to require('debug')('i18n:debug')
	logDebugFn: (msg) => {
		AppLogger.debug(`i18n debug:${msg}`);
	},

	// setting of log level WARN - default to require('debug')('i18n:warn')
	logWarnFn: (msg) => {
		AppLogger.warning(`i18n warning:${msg}`);
	},

	// setting of log level ERROR - default to require('debug')('i18n:error')
	logErrorFn: (msg: any) => {
		AppLogger.error(`i18n error:${msg}`, msg);
	},

	// used to alter the behaviour of missing keys
	missingKeyFn: function (locale, value) {
		return value;
	},

	// Parser can be any object that responds to .parse & .stringify
	parser: JSON
};

export default I18nConfig;

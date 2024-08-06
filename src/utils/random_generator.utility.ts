const randomNumber = require('random-number-csprng');

/**
 * Generate Random Number or String such as: code , number or random choice in array
 * return {string}
 */

/**
 * Generate random secure code with specified length.
 *
 * @param {number} length - Length of the generated code.
 * @returns {number} secure randomNumber
 */
export const generate_random_code = async (length: number): Promise<string> => {
	const min = Math.pow(10, length - 1);
	const max = Math.pow(10, length) - 1;

	return randomNumber(min, max);
};

/**
 * Generate NOT-SECURE randomNumber.
 *
 * @returns {number} number.
 */
export const generate_random_number = (min: number, max: number): number => {
	return Math.floor(Math.random() * (max - min) + min);
};

export const make_random_string = (length: number) => {
	let result = '';
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	const charactersLength = characters.length;
	let counter = 0;
	while (counter < length) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
		counter += 1;
	}
	return result;
};

/**
 * Handle Customize DateTime
 * return {DateTime}
 */
/**
 * Returns a new Date object representing a future date that is `days` days ahead of the current date.
 *
 * @param {number} days - The number of days to add to the current date.
 * @returns {Date} - A new Date object representing the future date.
 */
export const add_day = (days: number): Date => {
	const future_date = new Date();
	future_date.setDate(future_date.getDate() + days);
	return future_date;
};

export const add_hours_to_current_time = (hours_to_add: number): Date => {
	const currentTime = new Date();
	currentTime.setHours(currentTime.getHours() + hours_to_add);
	return currentTime;
};

export const add_minutes_to_current_time = (min_to_add: number): Date => {
	const currentTime = new Date();
	currentTime.setMinutes(currentTime.getMinutes() + min_to_add);
	return currentTime;
};

export const isValidTime = (time: string) => {
	return (
		time?.search(/^\d{2}:\d{2}$/) != -1 &&
		Number(time.substring(0, 2)) >= 0 &&
		Number(time.substring(0, 2)) <= 24 &&
		Number(time.substring(3, 5)) >= 0 &&
		Number(time.substring(3, 5)) <= 59
	);
};

export const getTimeMinutes = (time: string) => {
	const timeParts = time.split(':');
	return Number(timeParts[0]) * 60 + Number(timeParts[1]);
};

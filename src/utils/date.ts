import { startOfMonth, startOfToday } from "date-fns";
import dayjs from "dayjs";

/**
 * Generates a matrix representing the days of the specified month.
 *
 * @param {number} [month=dayjs().month()] - The month for which to generate the day matrix (0-11). Defaults to the current month.
 * @returns {Array<Array<dayjs.Dayjs>>} A 2D array representing the weeks and days of the month.
 *
 * @example
 * // Generate the day matrix for the current month
 * const matrix = getMonth();
 * console.log(matrix);
 *
 * @example
 * // Generate the day matrix for January
 * const januaryMatrix = getMonth(0);
 * console.log(januaryMatrix);
 */
export const getMonth = (month = dayjs().month()) => {
	const year = dayjs().year();
	const firstDayOfTheMonth = dayjs(new Date(year, month, -1)).day();
	let currentMonthCount = 6 - firstDayOfTheMonth;
	const dayMatrix = new Array(5).fill([]).map(() => {
		return new Array(7).fill(null).map(() => {
			currentMonthCount++;
			return dayjs(new Date(year, month, currentMonthCount));
		});
	});

	return dayMatrix;
};

/**
 * Returns the start date of the current month.
 *
 * @returns {Date} The start of the current month.
 *
 * @example
 * // Assuming today's date is July 19, 2024
 * const startOfMonth = getStartOfCurrentMonth();
 * console.log(startOfMonth);
 * // Output: Mon Jul 01 2024 00:00:00 GMT+0000 (Coordinated Universal Time)
 */
export const getStartOfCurrentMonth = () => {
	return startOfMonth(startOfToday());
};

/**
 * Converts a value representing minutes into a time string in the format HH:MM:SS.
 *
 * @param {string} value - The value in minutes to be converted.
 * @returns {string} The formatted time string in the format HH:MM:SS.
 *
 * @example
 * // Returns "01:01:00"
 * formatTimeToHHMMSS("61");
 *
 * @example
 * // Returns "00:02:30"
 * formatTimeToHHMMSS("2.5");
 */
export const formatTimeToHHMMSS = (value: string): string => {
	let minutes = parseFloat(value);
	const hours = Math.floor(minutes / 60);
	minutes %= 60;
	const seconds = Math.floor((minutes % 1) * 60);
	minutes = Math.floor(minutes);

	return [hours, minutes, seconds]
		.map((v) => (v < 10 ? "0" + v : v))
		.join(":");
};

/**
 * Converts a time string in the format HH:MM:SS to minutes.
 *
 * @param {string} time - The time string to be converted in the format HH:MM:SS.
 * @returns {number} The time in minutes.
 *
 * @example
 * // Returns 61
 * convertHHMMSSToMinutes("01:01:00");
 *
 * @example
 * // Returns 2.5
 * convertHHMMSSToMinutes("00:02:30");
 */
export const formatHHMMSSToMinutes = (time?: string): number => {
	const [hours, minutes, seconds] = time
		? time.split(":").map(Number)
		: [0, 0, 0];
	return hours * 60 + minutes + seconds / 60;
};

/**
 * Formats an input string to the MM/YY format, typically used for credit card expiration dates.
 *
 * This function intercepts key events to ensure that the input adheres to the MM/YY format.
 * It handles a variety of input scenarios, automatically adding a leading zero when necessary,
 * and inserting a forward slash between the month and year.
 *
 * @param {any} e - The event object from the input field.
 * @returns {string} - The formatted string in MM/YY format.
 */
export const formatInputToExpirationDate = (e: any): string => {
	const code = e.keyCode;
	const allowedKeys = [8]; // Allow backspace key
	if (allowedKeys.indexOf(code) !== -1) {
		return "";
	}

	e.target.value = e.target.value
		.replace(/^([1-9]\/|[2-9])$/g, "0$1/") // Add leading zero to single-digit months
		.replace(/^(0[1-9]|1[0-2])$/g, "$1/") // Add slash after valid month input
		.replace(/^([0-1])([3-9])$/g, "0$1/$2") // Correct inputs like "13" to "01/3"
		.replace(/^(0?[1-9]|1[0-2])([0-9]{2})$/g, "$1/$2") // Format MMYY into MM/YY
		.replace(/^([0]+)\/|[0]+$/g, "0") // Handle cases where input is only zeros
		.replace(/[^\d/]|^[/]*$/g, "") // Remove any non-digit and non-slash characters
		.replace(/\/\//g, "/"); // Remove any double slashes
	return e.target.value;
};

import { getAllCountries, getAllTimezones } from "countries-and-timezones";
import { State } from "country-state-city";
import { countryOptions, hexColorRegex } from "./constants";
import {
	ContinentTimeZones,
	DaySchedule,
	OperatingHour,
	ScheduleData,
} from "@/types/onboarding";
import moment from "moment";
import { UseFormSetValue } from "react-hook-form";

/**
 * Converts a hex color code to an RGB object.
 *
 * This function takes a hex color code as a string and converts it to an RGB object.
 * The hex code can be in the short format (`#RGB`) or the full format (`#RRGGBB`).
 * If the hex code is not valid, an error is thrown.
 *
 * @param {string} hex - The hex color code to convert. It can be in `#RGB` or `#RRGGBB` format.
 * @returns {{r: number, g: number, b: number}} - An object containing the red (r), green (g), and blue (b) values as numbers.
 * @throws {Error} If the hex color code is not valid.
 */
export const hexToRGB = (hex: string) => {
	hex = hex.replace(/^#/, "");
	let r: number, g: number, b: number;
	if (hex.length === 3) {
		r = parseInt(hex[0] + hex[0], 16);
		g = parseInt(hex[1] + hex[1], 16);
		b = parseInt(hex[2] + hex[2], 16);
	} else if (hex.length === 6) {
		r = parseInt(hex.slice(0, 2), 16);
		g = parseInt(hex.slice(2, 4), 16);
		b = parseInt(hex.slice(4, 6), 16);
	} else {
		throw new Error("Invalid HEX color.");
	}

	return { r, g, b };
};

/**
 * Changes the theme color by setting a CSS variable with the specified color.
 *
 * If the provided theme is "default", it will be replaced with a default color (`#005893`).
 * The function then converts the hex color to its RGB equivalent and updates the CSS
 * `--primary` variable with the RGB values.
 *
 * @param {string} theme - The hex color code or the string "default" to set the theme color.
 * @returns {string} - The theme that was actually set (either the original hex value or the default color).
 */
export const changeTheme = (theme: string): string => {
	const defaultColor = "#005893";

	// Handle the default theme case
	if (theme === "default") {
		theme = defaultColor;
	}

	// Ensure the theme is in a proper hex format
	if (!theme.startsWith("#")) {
		theme = `#${theme}`;
	}

	// Validate the hex color format using a regex
	if (!hexColorRegex.test(theme)) {
		console.warn(
			`Invalid hex color: ${theme}. Falling back to default color.`
		);
		theme = defaultColor;
	}

	// Convert hex to RGB
	const { r, g, b } = hexToRGB(theme);
	document.documentElement.style.setProperty("--primary", `${r} ${g} ${b}`);

	return theme;
};

/**
 * Retrieves a list of states/provinces based on the selected country.
 *
 * This function takes a country name as input, finds the corresponding country code,
 * and returns an array of state/province options for that country. Each option includes
 * the state's name as the label and the state's country code as the value.
 *
 * @param {string} country - The name of the country for which to retrieve states/provinces.
 * @returns {Array<{ label: string; value: string }>} An array of objects where each object
 *          contains the label (state name) and value (state country code).
 */
export const statesOptions = (country: string) =>
	country
		? Object.values(State.getStatesOfCountry(country)).map((state) => ({
				label: state.name,
				value: state.isoCode,
			}))
		: [];

/**
 * Retrieves a list of countries with their corresponding timezones.
 *
 * This function fetches all available countries and their associated timezones,
 * and then generates an array of objects that includes the country name with its
 * UTC offset for each timezone.
 *
 * @returns {Array<{ label: string; value: string }>} An array of objects where each object
 *          contains the label (country name with UTC offset) and value (country ID with UTC offset).
 */
export const getAllCountriesWithTimezones = () => {
	const allCountries = getAllCountries();
	const allTimezones = getAllTimezones();
	let countriesTimezones: Array<{ label: string; value: string }> = [];

	for (const countryCode in allCountries) {
		if (Object.prototype.hasOwnProperty.call(allCountries, countryCode)) {
			const country =
				allCountries[countryCode as keyof typeof allCountries];
			const countryTimezones = country.timezones;

			const timezones = countryTimezones.map((tz) => {
				const timezone = allTimezones[tz];
				const offset = parseInt(
					timezone.utcOffsetStr.split(":")[0],
					10
				);
				return {
					label: `${country.name} (UTC ${offset > 0 ? "+" + offset : offset})`,
					value: `${country.id}|UTC ${offset > 0 ? "+" + offset : offset}`,
				};
			});
			countriesTimezones = [...countriesTimezones, ...timezones];
		}
	}

	return countriesTimezones;
};

export const findCountry = (current: string = "") =>
	countryOptions.find((country) => country.value === current)?.label || "";

export const findState = (current: string = "", country: string = "") =>
	statesOptions(country).find((state) => state.value === current)?.label ||
	"";

/**
 * Converts a time string in the format "HH:MM:SS" to either total minutes or total seconds.
 *
 * @param {string} time - The time string to convert, formatted as "HH:MM:SS".
 * @param {"minutes" | "seconds"} convert - The unit to convert the time into.
 *                                          Pass "minutes" to convert to total minutes,
 *                                          or "seconds" to convert to total seconds.
 * @returns {number} - The converted time in the specified unit (either minutes or seconds).
 */
export const convertColumnTimeToMinutesOrSeconds = (
	time: string,
	convert: "minutes" | "seconds"
): number => {
	const [hours, minutes, seconds] = time.split(":").map(Number);
	if (convert === "minutes") return hours * 60 + minutes + seconds / 60;
	else if (convert === "seconds")
		return hours * 3600 + minutes * 60 + seconds;
	return 0;
};

/**
 * An array of schedule block options with predefined values.
 *
 * The options include specific values of "5" and "10", followed by additional values
 * generated in 15-minute intervals, ranging from 15 to 120 minutes.
 *
 * Each option is represented as an object with a `value` and `label`, both as strings.
 *
 * @type {{ value: string, label: string }[]}
 */
export const scheduleBlockOptions = [
	{ value: "5", label: "5" },
	{ value: "10", label: "10" },
	...Array.from({ length: 8 }).map((_, index) => ({
		value: ((index + 1) * 15).toString(),
		label: ((index + 1) * 15).toString(),
	})),
];

/**
 * Converts an array of operating hours into a structured schedule data object.
 *
 * The input array contains operating hours for different days of the week, which are then mapped
 * to a standardized format with keys representing each day (e.g., "monday", "tuesday", etc.).
 *
 * Each day's schedule includes an `is_active` flag and a list of time slots, where each time slot
 * is represented with a `start_time`, `end_time`, and optionally an `is_active` flag.
 *
 * @param {OperatingHour[] | undefined} input - The input array of operating hours, where each item contains
 *                                              the day, activity status, and time slots for that day.
 * @returns {ScheduleData} - The output schedule data, structured by days of the week with active status and time slots.
 */
export const convertSchedule = (
	input: OperatingHour[] | undefined
): ScheduleData => {
	const daysMapping: { [key: string]: string } = {
		Monday: "monday",
		Tuesday: "tuesday",
		Wednesday: "wednesday",
		Thursday: "thursday",
		Friday: "friday",
		Saturday: "saturday",
		Sunday: "sunday",
	};

	const output: ScheduleData = {};

	input?.forEach((daySchedule) => {
		const dayKey = daysMapping[daySchedule.day];
		if (dayKey) {
			output[dayKey] = {
				is_active: Boolean(daySchedule.is_active),
				time_slots: daySchedule.time_slots.map((slot) => ({
					start_time: slot.start_time.slice(0, 5),
					end_time: slot.end_time.slice(0, 5),
					...(slot.is_active !== undefined && {
						is_active: slot.is_active,
					}),
				})),
			};
		}
	});

	return output;
};

/**
 * Retrieves an array of time zones structured by continents. Each continent contains
 * multiple time zones with relevant country names and offsets.
 *
 * @returns {ContinentTimeZones[]} An array of continents each containing a list of time zones.
 */

export const newTimeZonesData = (): ContinentTimeZones[] => {
	const countryTimezones: ContinentTimeZones[] = [];
	moment.tz.names().forEach((timezone) => {
		// Get the timezone offset
		const offset = moment.tz(timezone).utcOffset() / 60;
		// Get the country name from the timezone
		const countryName = timezone.split("/")[0]; // Assumes the country name is the first part of the timezone

		// Find the continent of the country
		let continent = "";
		const continentIndex = timezone.indexOf("/");
		if (continentIndex !== -1) {
			continent = timezone.substring(0, continentIndex);
		}

		// Find the existing continent object or create a new one
		let continentObject = countryTimezones.find(
			(c) => c.continent === continent
		);
		if (!continentObject) {
			continentObject = { continent: continent, times: [] };
			countryTimezones.push(continentObject);
		}

		// Push the country data into the continent object
		continentObject.times.push({
			id: timezone,
			country: countryName,
			offsetHours: offset,
		});
	});
	return countryTimezones;
};

/**
 * Returns the list of states or provinces for a given country.
 *
 * @param {string} country - The country for which to retrieve the states or provinces.
 * @returns {Array<{ label: string, value: string }>} - An array of state or province options with `label` and `value` properties.
 */
export const changeCountry = (
	country: string
): Array<{ label: string; value: string }> => {
	if (country) {
		return statesOptions(country);
	} else {
		return [];
	}
};

/**
 * Updates the country and state fields in a form, setting the appropriate values and options.
 *
 * @param {UseFormSetValue<any>} setValue - The function to set form values.
 * @param {Dispatch<SetStateAction<any[]>>} setProvinceOptions - The function to set the province options.
 * @param {boolean} isFromAddress - A flag indicating if the update is triggered from an address selection.
 * @param {string} [stateValue] - The state value to set, if available.
 * @param {string} [countryValue] - The country value to set, if available.
 */
export const updateCountryAndState = (
	setValue: UseFormSetValue<any>,
	setProvinceOptions: React.Dispatch<React.SetStateAction<any[]>>,
	isFromAddress: boolean,
	stateValue?: string,
	countryValue?: string
): void => {
	if (isFromAddress) {
		setValue("country", countryValue);
		setProvinceOptions(changeCountry(countryValue ?? ""));
		setValue("state", stateValue);
	} else {
		if (countryValue) {
			setValue("country", countryValue);
			setProvinceOptions(changeCountry(countryValue));
		}
		if (stateValue) {
			setValue("state", stateValue);
		}
	}
};

/**
 * Formats a credit card number by adding spaces every four digits.
 *
 * This function removes any non-digit characters and limits the input to 20 digits.
 * It then groups the digits in blocks of four and joins them with spaces.
 *
 * @param {string} string - The input string containing the credit card number.
 * @returns {string} - The formatted credit card number with spaces between every four digits.
 */
export const formatCreditCard = (string: string): string => {
	const inputVal = string.replace(/ /g, "");
	let inputNumbersOnly = inputVal.replace(/\D/g, "");

	if (inputNumbersOnly.length > 20) {
		inputNumbersOnly = inputNumbersOnly.slice(0, 20);
	}

	const splits = inputNumbersOnly.match(/.{1,4}/g);

	let spacedNumber = "";
	if (splits) {
		spacedNumber = splits.join(" ");
	}
	return spacedNumber;
};

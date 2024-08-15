import { getAllCountries, getAllTimezones } from "countries-and-timezones";
import { State } from "country-state-city";
import { countryOptions } from "./constants";

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
export const changeTheme = (theme: string) => {
	if (theme == "default") {
		theme = "#005893";
	}
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
		? Object.values(
				State.getStatesOfCountry(
					countryOptions.find((c) => c.label === country)?.value
				)
			).map((state) => ({
				label: state.name,
				value: state.countryCode,
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

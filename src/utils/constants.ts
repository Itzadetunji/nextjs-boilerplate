import { Country } from "country-state-city";

export const InputPatterns = {
	elevenTelephone: /^\d{11}$/,
	tenTelephone: /^\d{10}$/,
	universalTelephone:
		/^\+(?:[1-9]|[1-9][0-9]|1\d{2}|2[0-4][0-9]|25[0-9])\d{10}$/,
	password: /^(?=.*[\W_]).{8,20}$/,
	email: /^([a-z\d.-_]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?(\.[a-z]{2,8})?(\.[a-z]{2,8})?$/,
};

/**
 * An array of country dialing codes.
 *
 * This array contains dialing codes for 249 countries, formatted with a "+" sign
 * followed by the country code. Each object in the array includes the dialing code
 * as both the label and the value.
 *
 * @type {Array<{ label: string; value: string }>}
 */
export const countryCodes = Array.from({ length: 249 }, (_, i) => {
	return { label: "+" + (i + 1), value: "+" + (i + 1) };
});

/**
 * An array of country options.
 *
 * This array contains all available countries, where each object includes the
 * country's ISO code as the value and the country's name as the label.
 *
 * @type {Array<{ value: string; label: string }>}
 */
export const countryOptions = Object.values(Country.getAllCountries()).map(
	(country) => ({
		value: country.isoCode,
		label: country.name,
	})
);

import { OperatingHour } from "@/types/onboarding";
import { Country } from "country-state-city";

export const InputPatterns = {
	elevenTelephone: /^\d{11}$/,
	tenTelephone: /^\d{10}$/,
	universalTelephone:
		/^\+(?:[1-9]|[1-9][0-9]|1\d{2}|2[0-4][0-9]|25[0-9])\d{10}$/,
	password: /^(?=.*[\W_]).{8,20}$/,
	email: /^([a-z\d.-_]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?(\.[a-z]{2,8})?(\.[a-z]{2,8})?$/,
};

const initialCountryOptions = Object.values(Country.getAllCountries())
	.map((country) => ({
		value: country.isoCode,
		label: country.name,
	}))
	.filter((country) => country.value !== "CA" && country.value !== "US");

/**
 * An array of country dialing codes.
 *
 * This array contains dialing codes for 249 countries, formatted with a "+" sign
 * followed by the country code. Each object in the array includes the dialing code
 * as both the label and the value.
 *
 * @type {Record<string, string>[]}
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
export const countryOptions = [
	{ value: "CA", label: "Canada" },
	{ value: "US", label: "United States" },
	...initialCountryOptions,
];

export const ProductTypeOptions: Record<string, string>[] = [
	{
		value: "primary",
		label: "Scheduler + Flow",
	},
	{
		value: "room_booking",
		label: "Spaces",
	},
];

export const hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

export const oldDefaultTimeSlots: OperatingHour[] = [
	{
		day: "Monday",
		day_value: 1,
		is_active: 1,
		time_slots: [{ start_time: "09:00:00", end_time: "17:00:00" }],
	},
	{
		day: "Tuesday",
		day_value: 2,
		is_active: 1,
		time_slots: [{ start_time: "09:00:00", end_time: "17:00:00" }],
	},
	{
		day: "Wednesday",
		day_value: 3,
		is_active: 1,
		time_slots: [{ start_time: "09:00:00", end_time: "17:00:00" }],
	},
	{
		day: "Thursday",
		day_value: 4,
		is_active: 1,
		time_slots: [{ start_time: "09:00:00", end_time: "17:00:00" }],
	},
	{
		day: "Friday",
		day_value: 5,
		is_active: 1,
		time_slots: [{ start_time: "09:00:00", end_time: "17:00:00" }],
	},
	{
		day: "Saturday",
		day_value: 6,
		is_active: 0,
		time_slots: [{ start_time: "09:00:00", end_time: "17:00:00" }],
	},
	{
		day: "Sunday",
		day_value: 0,
		is_active: 0,
		time_slots: [{ start_time: "09:00:00", end_time: "17:00:00" }],
	},
];

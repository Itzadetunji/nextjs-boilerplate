import { z } from "zod";

export const AddLocationSchema = z.object({
	name: z.string().min(3, { message: "Location name is required" }),
	address: z.string(),
	image: z.any(),
	country: z.string(),
	state: z.string(),
	city: z.string(),
	approximate_waiting_time: z.string().refine(
		(time) => {
			return +time >= 5;
		},
		{
			message: "Minimum wait time: 5 mins",
		}
	),
	schedule_block_in_min: z
		.number()
		.min(5, "Minimum schedule block time: 5 mins"),
	time_zone: z.string().refine((value) => !!value, {
		message: "Kindly select time zone",
	}),
	day_time_slots: z.array(
		z.object({
			day: z.string(),
			day_value: z.number(),
			is_active: z.number(),
			time_slots: z.array(
				z.object({
					start_time: z.string(),
					end_time: z.string(),
				})
			),
		})
	),
});

export const AddBusinessInfoSchema = z.object({
	name: z.string().min(4, { message: "Name must be at least 4 characters" }),
	address: z
		.string()
		.min(4, { message: "Address must be at least 4 characters" }),
	country: z.string(),
	state: z.string(),
	city: z.string(),
	phone_number: z.string().optional(),
	business_category_id: z
		.string()
		.min(1, { message: "Kindly select a business category" }),
	zip_code: z.string().optional(),
	product_type: z.string(),
	logo: z.any().optional(),
});

export const UpdateBusinessCardSchema = z.object({
	payment_information: z.object({
		name: z
			.string()
			.min(6, { message: "Name must be at least 6 characters" })
			.optional(),
		zipCode: z
			.string()
			.min(6, { message: "Zip Code must be at least 6 characters" })
			.optional(),
		type: z.string(),
		card: z.object({
			number: z
				.string()
				.min(18, { message: "This card number is too short" }),
			exp_month: z
				.number()
				.min(1, { message: "Expiration date is required" }),
			exp_year: z
				.number()
				.min(1, { message: "Expiration date is required" }),
			cvc: z.string().min(3, { message: "CVC is required" }),
		}),
	}),
});

export const AddBusinessCardSchema = UpdateBusinessCardSchema.extend({
	price_id: z.string(),
});

export interface OperatingHour {
	id?: number;
	day: string;
	day_value: number;
	is_active?: 0 | 1;
	location?: any;
	location_id?: number;
	service_time_slots?: any[];
	time_slots: TimeSlot[];
}

export interface TimeSlot {
	is_active?: 0 | 1;
	start_time: string;
	end_time: string;
}

export interface DaySchedule {
	is_active: boolean;
	time_slots: TimeSlot[];
}

export interface ScheduleData {
	[key: string]: DaySchedule;
}

export type TimeZoneInfo = {
	id: string; // The IANA timezone identifier
	country: string; // The name of the country extracted from the timezone string
	offsetHours: number; // The UTC offset in hours
};

export type ContinentTimeZones = {
	continent: string; // The name of the continent
	times: TimeZoneInfo[]; // An array of time zones within this continent
};

export interface SubscriptionPlan {
	product_id: string;
	name: string;
	description: string;
	features: string[];
	price: number;
	trial_period_days: number | null;
	default_price: {
		price_id: string;
		active: boolean;
		price: number;
		features: string[];
	};
	custom_prices: any[];
}

export type AddBusinessCardData = z.infer<typeof AddBusinessCardSchema>;
export type UpdateBusinessCardData = z.infer<typeof UpdateBusinessCardSchema>;
export type AddBusinessInfoData = z.infer<typeof AddBusinessInfoSchema>;
export type AddLocationType = z.infer<typeof AddLocationSchema>;

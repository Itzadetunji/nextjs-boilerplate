import { TokenResponse } from "@react-oauth/google";
import { z } from "zod";

export const SignUpSchema = z.object({
	name: z.string().min(4, { message: "Name must be at least 4 characters" }),
	password: z
		.string()
		.min(8, { message: "Password must be at least 8 characters" }),
	email: z.string().email({ message: "Invalid email address format" }),
});

export type SignUpType = z.infer<typeof SignUpSchema>;

export interface User {
	id: number;
	name: string;
	email: string;
	role: string | null;
	job_title: string | null;
	stripe_customer_id: string | null;
	created_at: string;
	updated_at: string | null;
	stripe_id: string | null;
	pm_type: string | null;
	pm_last_four: string | null;
	trial_ends_at: string | null;
	business_id: number;
	is_email_verified: number;
	is_active: number;
	business: Business;
	onboarding_state: number;
	phone_number: string | null;
	theme: string | null;
}

export interface Business {
	id: number | null;
	name: string | null;
	address: string | null;
	country: string | null;
	state: string | null;
	city: string | null;
	phone_number: string | null;
	logo_url: string | null;
	admin_id: number | null;
	created_at: string | null;
	updated_at: string | null;
	is_active: number | null;
	theme: string | null;
	business_category_id: number | null;
	schedule_auto_confirm: number | null;
	locations: Location[];
	room_booking_locations: Location[];
	custom_fields: CustomFields[];
	products: any[];
	use_average_wait_time: number | null;
	average_waiting_time: string | null;
	zip_code?: string | null;
}

export interface CustomFields {
	id: number;
	business_id: number;
	field: string;
	is_optional: number; // Alternatively, use boolean if is_optional can only be 0 or 1
	is_active: number; // Alternatively, use boolean if is_active can only be 0 or 1
	fieldKey: string;
}

export interface Location {
	id: number;
	name: string;
	address: string;
	country: string | null;
	state: string | null;
	city: string | null;
	admin_id: number | null;
	business_id: number | null;
	approximate_waiting_time: string | null;
	created_at: string | null;
	updated_at: string | null;
	is_active: number | null;
	available_slots_per_day: number | null;
	time_zone: string | null;
	schedule_block_in_min: number | null;
	stations: Station[];
}

export interface Station {
	id: number;
	name: string;
	location_id: number;
	admin_id: number;
	created_at: string;
	updated_at: string | null;
	is_active: number | null;
	business_id: number;
	schedule_before: string | null;
	approximate_waiting_time: string | null;
	schedule_auto_confirm: number | null;
	url_code: string | null;
	schedule_url: string | null;
	queue_url: string | null;
	is_queue_active: boolean | null;
	is_authorized_to_user: boolean | null;
}

export interface GoogleAccessTokenData {
	access_token: string;
	token_type: string;
	expires_in: number;
	scope: string;
	authuser: string;
	prompt: string;
}

export interface GoogleUserProfile {
	id: string;
	email: string;
	verified_email: boolean;
	name: string;
	given_name: string;
	family_name: string;
	picture: string;
	locale: string;
}

export interface GoogleUserCompleteRegisterParama {
	access_token_data:
		| Omit<TokenResponse, "error" | "error_description" | "error_uri">
		| undefined;
	profile: GoogleUserProfile;
}

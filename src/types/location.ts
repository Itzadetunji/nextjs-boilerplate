export interface AddBusinessLocationResponseType {
	status: boolean;
	message: string;
	location: LocationResponse;
}

export interface LocationResponse {
	id: number;
	location_image?: string;
	name: string;
	address: string;
	country: string;
	state: string;
	city: string;
	phone_number: string;
	image: string;
	image_url?: string;
	admin_id: number;
	business_id: number;
	approximate_waiting_time: string;
	created_at: string;
	updated_at: string;
	is_active: number;
	available_slots_per_day: number | null;
	scheule_block_in_min: number;
	time_zone: string;
	average_waiting_time: string | null;
	use_average_wait_time: number;
	auto_clearing_minutes: number;
	is_auto_clearing_on: number;
	settings: any | null;
	stations: StationsArrayProps;
	queue_settings: GetLocationsQueueSetting;
}

interface GetLocationsQueueSetting {
	id: number;
	auto_approve: number;
	is_visible: number;
	settingable_id: number;
	settingable_type: string;
	created_at: string;
	updated_at: string;
}

export interface StationsProps {
	id: number;
	name: string;
	location_id: number;
	admin_id: number;
	created_at: string;
	updated_at: string;
	is_active: number;
	business_id: number;
	schedule_before: string | null;
	average_waiting_time: string | null;
	use_average_wait_time: number | null;
	url_code: string;
	schedule_url: string;
	queue_url: string;
	is_queue_active: boolean;
	is_authorized_to_user: boolean;
	settings: Settings;
	queue_setting: unknown;
	schedule_optimizer: unknown;
}

export type StationsArrayProps = StationsProps[];

interface StationSettings {
	time_zone: string;
	is_queue_active: number;
	manual_wait_time: string;
	auto_flow_enabled: number;
	average_wait_time: string;
	auto_approve_enabled: number;
	schedule_block_in_min: number;
	total_waitlists_count: number;
	use_average_wait_time: number;
	priority_order_enabled: number;
}

interface Settings {
	id: number;
	settingable_type: string;
	settingable_id: number;
	created_at: string;
	updated_at: string;
	settings: StationSettings;
}

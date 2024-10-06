export interface ErrorResponse {
	status: boolean;
	message: string;
	errors?: {
		[key: string]: string[];
	};
}

import { CONFIGS } from "@/configs";
import axios, { AxiosInstance } from "axios";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { getCookie, setCookie } from "cookies-next";

const baseURL = CONFIGS.URL.API_BASE_URL;

// Create new axios instance
const $http: AxiosInstance = axios.create({
	baseURL,
	timeout: 30000,
	headers: {
		"Content-Type": "application/json",
	},
});

$http.interceptors.request.use(async (config) => {
	await refreshAuthTokenLogic();
	const currentUrl = window.location.href;

	// To get the current URL pathname for onboarding
	const url = new URL(currentUrl);

	if (
		url.pathname.includes("/onboarding") &&
		url.searchParams.get("redirect")
	) {
		setCookie("ac-token", url.searchParams.get("redirect"));
	}

	// If access-token is available, add it to the Axios Authorization header
	if (getCookie("ac-token")) {
		config.headers["Authorization"] = `Bearer ${getCookie("ac-token")}`;
	}

	return config;
});

export const refreshAuthTokenLogic = async () => {
	const accessTokenJWT = getCookie("ac-token", {}) as string;
	const refreshTokenJWT = getCookie("refresh-token", {}) as string;

	// if access-token or refresh-token is not available, bail out
	if (!accessTokenJWT || !refreshTokenJWT) return;

	const accessToken: JwtPayload = jwtDecode(accessTokenJWT);
	const refreshToken: JwtPayload = jwtDecode(refreshTokenJWT);

	// confirm that both access-token and refresh-token have exp property
	if (!accessToken.exp || !refreshToken.exp) return;

	// Check if accessToken is expired and refreshToken has not expired
	const accessTokenIsExpired = accessToken.exp * 1000 < Date.now();
	const refreshTokenIsNotExpired = refreshToken.exp * 1000 > Date.now();

	if (accessTokenIsExpired && refreshTokenIsNotExpired) {
		try {
			const { data: response, status } = await axios.post(
				baseURL + "/v1/auth/token/refresh/",
				{ refreshToken: refreshTokenJWT }
			);

			if (status === 200 && response.data) {
				// update access-token and refresh-token
				setCookie("ac-token", response.data.accessToken);
				setCookie("refresh-token", response.data.refreshToken);
			}
		} catch (error) {
			if (axios.isAxiosError(error)) {
				// console.log("error.response:", error.response);
			}
		}
	}
};

export default $http;

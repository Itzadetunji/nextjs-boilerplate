export const setCookie = (name: string, value: string, expiresDays: number) => {
	const date = new Date();
	date.setTime(date.getTime() + expiresDays * 24 * 60 * 60 * 1000);
	const expires = `expires=${date.toUTCString()}`;
	document.cookie = `${name}=${value};${expires};path=/`;
};

export const setCookieWithoutExpiry = (name: string, value: string) => {
	document.cookie = `${name}=${value}; path=/`;
};

export const deleteExpiredCookie = (name: string) => {
	const cookie = document.cookie
		.split("; ")
		.find((row) => row.startsWith(`${name}=`));
	if (!cookie) {
		return;
	}
	const [, value, expires] = cookie.split("=");
	const expiryDate = new Date(expires);

	if (expiryDate <= new Date()) {
		document.cookie = `${value}`;
		document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/`;
	}
};

export const getCookie = (name: string): string | null => {
	const cookies: string[] = document.cookie.split("; ");
	for (let i = 0; i < cookies.length; i++) {
		const cookie = cookies[i].split("=");
		if (cookie[0] === name) {
			return cookie[1];
		}
	}
	return null;
};

export const deleteCookie = (name: string) => {
	document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

export const deleteAllCookies = (): void => {
	const cookies = document.cookie.split(";");
	for (let i = 0; i < cookies.length; i++) {
		document.cookie =
			cookies[i] + "=; expires=" + new Date(0).toUTCString();
	}
};

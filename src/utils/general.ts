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

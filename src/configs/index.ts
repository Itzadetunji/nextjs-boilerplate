import packageInfo from "../../package.json";

// How to use this:
// ============================================================
// This file is used to store all the environment variables and constants used in the application.

// # To add a new variable:
// ============================================================
// - For environment variables & constants that are the same across all environments, add them to the GLOBAL_CONSTANTS object.
// - For environment-specific variables (i.e they change depending on the environemnt), add them to the environment's object in each of the CONFIG_BUILDER object.

// # To add a new environment:
// ============================================================
// 1. Add a new key to the CONFIG_BUILDER object with the environment name.
// 2. Duplicate the development object and replace the values with the new environment's values.

const APP_VERSION = packageInfo.version;
const NODE_ENV = process.env.NODE_ENV || "development";

const GLOBAL_CONSTANTS = {
	// System Constants
	// ============================================================
	APP_NAME: packageInfo.name,

	URL: {
		API_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
		API_VERSION: process.env.NEXT_API_VERSION,
		CLIENT_URL: process.env.VITE_CLIENT_URL,
	},

	// Sentry & Monitoring Configs
	// ============================================================
	SENTRY: {
		RELEASE: APP_VERSION,
		DSN: "", // TODO: Add Sentry DSN here
		PROJECT: "", // TODO: Add Sentry Project here
		ORGANISATION: "", // TODO: Add Sentry Organisation here
	},
};

// NOTE: Uncomment if you have different credentials for dev and prod

// const CONFIG_BUILDER = {
// 	development: {
// 		...GLOBAL_CONSTANTS,

// 		// System Constants
// 		// ============================================================
// 		URL: {
// 			API_BASE_URL: process.env.NEXT_BASE_URL,
// 		},

// 		// App Level Configs
// 		// ============================================================

// 		// e.g
// 		// STRIPE: {
// 		//     PUBLIC_KEY: "pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
// 		// },
// 	},

// 	production: {
// 		...GLOBAL_CONSTANTS,

// 		// System Constants
// 		// ============================================================
// 		URL: {
// 			API_BASE_URL: "https://api.trail.com",
// 		},

// 		// App Level Configs
// 		// ============================================================

// 		// e.g
// 		// STRIPE: {
// 		//     PUBLIC_KEY: "pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
// 		// },
// 	},
// } as const;

// Check if NODE_ENV is valid
// if (!Object.keys(CONFIG_BUILDER).includes(NODE_ENV)) {
// 	throw new Error(`Invalid NODE_ENV: ${NODE_ENV}`);
// }

// const CONFIGS = CONFIG_BUILDER[NODE_ENV as keyof typeof CONFIG_BUILDER];

const CONFIGS = GLOBAL_CONSTANTS;

// Uncomment below to check configs set
// console.log("CONFIGS:", CONFIGS);

export { NODE_ENV, APP_VERSION, CONFIGS };

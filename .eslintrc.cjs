module.exports = {
	env: {
		browser: true,
		node: true,
		es2021: true,
	},
	extends: [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:prettier/recommended",
	],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: "latest",
		sourceType: "module",
	},
	plugins: ["react", "@typescript-eslint", "react-hooks"],
	rules: {
		"react/prop-types": "off",
		"react/react-in-jsx-scope": "off",
		"prettier/prettier": [
			"warn",
			{ endOfLine: "auto", useTabs: true },
			{ usePrettierrc: true },
		],
		"no-restricted-imports": "off",
		"react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
		"react-hooks/exhaustive-deps": "warn",
		"@typescript-eslint/no-unused-vars": "warn",
		"@typescript-eslint/no-explicit-any": "warn",
	},
};

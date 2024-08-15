import type { Config } from "tailwindcss";

const config = {
	darkMode: ["class"],
	content: ["./src/**/*.{ts,tsx}"],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},

			colors: {
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				primary: {
					DEFAULT: "rgb(var(--primary) / <alpha-value>)",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
				status: {
					1: "#C8322B",
					2: "#E4AC29",
					3: "#285A8A",
					4: "#138576",
				},
				main: {
					1: "#323539",
					2: "#005893",
					3: "#E5E5E7",
					4: "#858C95",
					5: "#C8322B",
					6: "#F7F7F7",
					7: "#6D748D",
				},
				green: {
					100: "#48AA75",
				},
				gray: {
					100: "#858C95",
				},
			},
			fontFamily: {
				hoves: ["TT Hoves Pro Trial", "sans-serif"],
				inter: ["Inter", "sans-serif"],
			},
			fontSize: {
				"xxs": "10px",
				"32px": "32px",
				"28px": "28px",
				"15px": "15px",
			},
			height: {
				"80px": "80px",
				"124px": "124px",
				"246.65px": "246.65px",
				"466px": "466px",
			},
			width: {
				"268.67px": "268.67px",
				"360px": "360px",
			},
			boxShadow: {
				custom: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
			},
			letterSpacing: {
				"-1%": "-1%",
				"-1.5%": "-1.5%",
				"-0.5%": "-0.5%",
				"0.5%": "0.5%",
			},
			screens: {
				"xs": "428px",
				"1.5xl": "1440px",
				"mxs": { max: "427px" },
				"msm": { max: "639px" },
				"mmd": { max: "767px" },
				"mlg": { max: "1023px" },
				"mxl": { max: "1279px" },
				"m2xl": { max: "1535px" },
				"m1.5xl": { max: "1439px" },
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;

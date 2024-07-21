import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
	future: {
		hoverOnlyWhenSupported: true,
	},
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				sans: ["inter", "sans-serif"],
			},
			colors: {
				"primary-accent": {
					DEFAULT: "#00C2DB",
				},
				"secondary-accent": {
					DEFAULT: "#EA4587",
				},
			},
		},
	},
	plugins: [require("daisyui")],
	daisyui: {
		themes: [
			{
				mytheme: {
					primary: "#1ED6E7",

					secondary: "#F17BAC",

					accent: "#EC8E4D",

					neutral: "#111827",

					"base-100": "#F5FEFE",

					info: "#2563eb",

					success: "#4ade80",

					warning: "#be123c",

					error: "#facc15",
				},
			},
		],
	},
};

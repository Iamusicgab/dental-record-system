import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	server: {
		https: {
			key: "host.key",
			cert: "host.cert",
		},
	},
	define: {
		VITE_VERCEL_APIKEY: process.env.VITE_VERCEL_APIKEY,
		VITE_VERCEL_AUTHDOMAIN: process.env.VITE_VERCEL_AUTHDOMAIN,
		VITE_VERCEL_PROJECTID: process.env.VITE_VERCEL_PROJECTID,
		VITE_VERCEL_STORAGEBUCKET: process.env.VITE_VERCEL_STORAGEBUCKET,
		VITE_VERCEL_MESSAGINGSENDERID: process.env.VITE_VERCEL_MESSAGINGSENDERID,
		VITE_VERCEL_APPID: process.env.VITE_VERCEL_APPID,
		VITE_VERCEL_MEASUREMENTID: process.env.VITE_VERCEL_MEASUREMENTID,
	},
	plugins: [react()],
});

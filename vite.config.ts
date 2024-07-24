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
		__APP_ENV__: process.env.VITE_VERCEL_ENV,
	},
	plugins: [react()],
});

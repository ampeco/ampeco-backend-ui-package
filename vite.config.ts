import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vitest/config";
import dts from "vite-plugin-dts";
import raw from "vite-raw-plugin";
import { UserConfigExport } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";
import tailwindcss from "@tailwindcss/vite";

const app = async (): Promise<UserConfigExport> => {
	return defineConfig({
		plugins: [
			dts({
				insertTypesEntry: true,
				root: "./",
				outDir: "dist/types",
			}),
			react(),
			raw({
				fileRegex: /\.md$/,
			}),
			viteStaticCopy({
				targets: [
					{
						src: "src/assets",
						dest: ".",
					},
				],
			}),
			tailwindcss(),
		],
		build: {
			lib: {
				entry: path.resolve(__dirname, "./src/index.ts"),
				name: "ampeco-ui",
				formats: ["cjs", "es"],
				fileName: (format) => `ampeco-ui.${format}.js`,
				cssFileName: "style",
			},
			chunkSizeWarningLimit: 1024,
			rollupOptions: {
				external: ["react", "react-dom", "react-router-dom"],
				output: {
					globals: {
						react: "React",
						"react-dom": "ReactDOM",
					},
				},
			},
		},
		test: {
			globals: true,
			environment: "jsdom",
			setupFiles: "./setupTest.js",
		},
	});
};
// https://vitejs.dev/config/
export default app;

import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		css: true,
		environment: 'jsdom',
		globals: true,
		setupFiles: ['./setupTest.js'],
		exclude: ['node_modules/**/*'],
		coverage: {
			reportsDirectory: './tests/unit/coverage'
		}
	},
});

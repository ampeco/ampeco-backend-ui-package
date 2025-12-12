module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	parserOptions: {
		'ecmaVersion': 'latest',
		'sourceType': 'module'
	},
	env: {
		browser: true,
		es2021: true,
		node: true
	},
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:react-hooks/recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:storybook/recommended'
	],
	overrides: [],
	plugins: [
		'react',
		'@typescript-eslint'
	],
	settings: {
		react: {
			version: 'detect'
		}
	},
	ignorePatterns: [
		'stories/**/*.*'
	],
	rules: {
		indent: ['error', 'tab', { 'SwitchCase': 1 }],
		quotes: ['error', 'single'],
		semi: ['error', 'always'],
		'no-console': 'warn',
		'react/react-in-jsx-scope': 'off',
		'react/prop-types': 'off',
		'@typescript-eslint/ban-ts-comment': 'off'
	}
};

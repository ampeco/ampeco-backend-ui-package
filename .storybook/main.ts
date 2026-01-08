import type { StorybookConfig } from "@storybook/react-vite";
import path from "path";

const config: StorybookConfig = {
	stories: ["../stories/**/*.mdx", "../stories/**/*.stories.@(js|jsx|ts|tsx)"],
	addons: [
		"@storybook/addon-links",
		"@storybook/addon-essentials",
		"@storybook/addon-interactions",
		"@storybook/addon-mdx-gfm",
		"@chromatic-com/storybook",
	],
	framework: {
		name: "@storybook/react-vite",
		options: {},
	},
	typescript: {
		check: false,
		reactDocgen: "react-docgen-typescript",
	},
	docs: {},
	staticDirs: [
		{
			from: "../tests",
			to: "tests",
		},
		"../src/assets/extensions",
	],
};

export default config;

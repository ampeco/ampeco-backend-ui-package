import React from "react";
import classNames from "classnames";

export const globalTypes = {
	theme: {
		name: "Theme",
		description: "Apply global theme for components",
		defaultValue: "light",
		toolbar: {
			icon: "circlehollow",
			items: [
				{ value: "light", title: "Light theme" },
				{ value: "dark", title: "Dark theme" },
			],
		},
	},
};
export const decorators = [
	(Story, context) => {
		const theme = context.globals.theme;
		const classes = classNames(theme, "");
		return (
			<div className={classes}>
				<Story />
			</div>
		);
	},
];

export const parameters = {
	options: {
		storySort: {
			order: [
				"Documentation",
				["Getting started", "Changelog", "Coverage Report", "Theming"],
				"Example",
				"Components",
				"Forms",
			],
		},
	},
};

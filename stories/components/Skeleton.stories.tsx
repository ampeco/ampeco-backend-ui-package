import React from "react";
import { Skeleton as SkeletonComponent } from "../../src/components/skeleton/Skeleton";
const Template = (args) => <SkeletonComponent {...args} />;

export default {
	title: "Components/Skeleton",
	component: SkeletonComponent,

	args: {
		Component: "span",
		children: undefined,
		fullWidth: false,
	},

	argTypes: {
		children: {
			control: "text",
			description: "Content to be hidden but used for sizing the skeleton",
		},
		fullWidth: {
			control: "boolean",
			description: "Makes the skeleton take full width (adds w-full class)",
		},
	},
};

export const SkeletonStory = {
	render: Template.bind({}),
	name: "Skeleton",
};

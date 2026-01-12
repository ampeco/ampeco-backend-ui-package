import React from "react";
import { Loader } from "../../src";

const Template = (args) => <Loader {...args} />;

export default {
	title: "Components/Loader",
	component: Loader,

	args: {
		size: "m",
		color: "primary",
	},
	argTypes: {
		size: {
			options: ["xs", "sm", "m", "lg"],
			control: {
				type: "radio",
			},
		},
		color: {
			options: ["primary", "warning", "danger", "success"],
			control: {
				type: "radio",
			},
		},
	},
};

export const LoaderStory = {
	render: Template.bind({}),
	name: "Loader",
};

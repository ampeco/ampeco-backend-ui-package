import React from "react";
import { Tag } from "../../src";
import { Shape } from "../../src/types/Shape";

const Template = (args) => <Tag {...args} />;

export default {
	title: "Components/Tag",
	component: Tag,

	args: {
		children: "Tag",
		type: "default",
		shape: Shape.DEFAULT,
	},

	argTypes: {
		type: {
			control: "radio",
			options: ["default", "danger", "success", "warning", "info", "primary"],
			description: "Controls the color of the tag",
		},
	},
};

export const TagStory = {
	render: Template.bind({}),
	name: "Tag",
};

import React from "react";
import { Card } from "../../src";
import { Shape } from "../../src/types/Shape";

const Template = (args) => <Card {...args}>Card Content</Card>;

export default {
	title: "Components/Card",
	component: Card,

	args: {
		showBody: true,
		showHeader: true,
		showFooter: true,
		showDivider: true,
		shape: Shape.DEFAULT,
		selected: false,
		disabled: false,
		footer: "Footer",
		header: "Header",
		actions: "Actions",
	},

	argTypes: {},
};

export const CardStory = {
	render: Template.bind({}),
	name: "Card",
};

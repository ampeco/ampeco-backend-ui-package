import { Meta } from "@storybook/addon-docs";
import { Accordion, TogglerOrigin, TogglerPosition } from "../../src";
import React from "react";

const Template = (args) => <Accordion {...args} />;

export default {
	title: "Components/Accordion",
	component: Accordion,

	args: {
		children: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ac luctus tellus. Cras vehicula turpis in risus ultrices condimentum. Quisque nec nisl aliquam risus malesuada ullamcorper. Integer porta convallis purus, eu molestie massa aliquam et. Quisque elementum dolor erat. Proin laoreet, erat sed placerat facilisis, tortor eros cursus lectus, sit amet finibus eros diam facilisis turpis. Curabitur non sem hendrerit, finibus nisl nec, hendrerit dolor.`,
		header: "Title",
		defaultOpen: false,
		togglerOrigin: TogglerOrigin.ARROW,
		togglerPosition: TogglerPosition.RIGHT,
		togglerTooltip: "Open accordion",
	},

	argTypes: {
		header: {
			description: "Sets text of the header",
		},
		togglerOrigin: {
			description: "Set the default clickable item",
		},
		togglerPosition: {
			description: "Sets the position of the text and arrow",
		},
		togglerTooltip: {
			description: "Sets the tooltip message while pointing to the arrow",
		},
		defaultOpen: {
			description: "Controls default state",
		},
	},
};

export const AccordionStory = {
	render: Template.bind({}),
	name: "Accordion",
};

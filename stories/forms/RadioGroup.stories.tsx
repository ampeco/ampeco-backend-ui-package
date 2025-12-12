import React from "react";
import { Radio } from "../../src";
import { RadioGroup } from "../../src/components/field/radio/RadioGroup";

const Template = (args) => (
	<RadioGroup {...args}>
		<Radio value="email">Email</Radio>
		<Radio value="phone">Phone</Radio>
		<Radio value="fax">Fax</Radio>
	</RadioGroup>
);

export default {
	title: "Forms/Radio Group",
	component: RadioGroup,

	argTypes: {
		children: {
			control: {
				type: null,
			},
		},

		value: {
			control: {
				type: "text",
			},
		},
	},

	args: {
		value: "email",
	},
};

export const RadioGroupStory = {
	render: Template.bind({}),
	name: "Radio Group",
};

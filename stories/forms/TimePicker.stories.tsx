import React from "react";
import { TimePicker } from "../../src";

const Template = (args) => (
	<div style={{ height: "400px" }}>
		<TimePicker {...args} />
	</div>
);

export default {
	title: "Forms/Time picker",
	component: TimePicker,

	args: {
		id: "time",
		error: false,
		errorMsg: "Invalid time",

		minTime: {
			hours: 5,
			minutes: 30,
		},

		maxTime: {
			hours: 20,
			minutes: 30,
		},
	},

	argTypes: {
		shape: {
			control: "radio",
			options: ["default", "rounded", "square"],
		},
		size: {
			control: "radio",
			options: ["small", "medium", "large"],
		},
	},
};

export const TimePickerStory = {
	render: Template.bind({}),
	name: "Time picker",
	height: "200px",
};

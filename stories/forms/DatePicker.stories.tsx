import React from "react";
import { DatePicker } from "../../src";

const Template = (args) => <DatePicker {...args} />;

export default {
	title: "Forms/Date picker",
	component: DatePicker,
	decorators: [
		(Story) => (
			<div style={{ height: "400px" }}>
				<Story />
			</div>
		),
	],
	args: {
		id: "date",
		maxDate: {
			year: 2029,
			month: 11,
			date: 15,
		},

		minDate: {
			year: 2023,
			month: 2,
			date: 14,
		},
		clearable: false,
		showTimePicker: true,
		error: false,
		errorMsg: "",
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

export const DatePickerStory = {
	render: Template.bind({}),
	name: "Date picker",
	height: "425px",
};

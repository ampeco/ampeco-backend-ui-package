import React from "react";
import { Textarea as TextareaComponent } from "../../src";

const Template = (args) => <TextareaComponent {...args} />;

export default {
	title: "Forms/Textarea",
	component: TextareaComponent,

	args: {
		id: "textarea",
		value: undefined,
		disabled: false,
		readonly: false,
		required: false,
		error: false,
		rows: 4,
		cols: undefined,
		placeholder: "Enter your message...",
		label: "",
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
		rows: {
			control: "number",
		},
		cols: {
			control: "number",
		},
	},
};

export const TextareaStory = {
	render: Template.bind({}),
	name: "Textarea",
};

export const WithLabel = {
	render: Template.bind({}),
	name: "With Label",
	args: {
		label: "Description",
		placeholder: "Enter a description...",
	},
};

export const Required = {
	render: Template.bind({}),
	name: "Required",
	args: {
		label: "Required Textarea",
		required: true,
		placeholder: "This field is required",
	},
};

export const WithError = {
	render: Template.bind({}),
	name: "With Error",
	args: {
		label: "Description",
		error: true,
		errorMsg: "This field is required",
		value: "Invalid input",
	},
};

export const Disabled = {
	render: Template.bind({}),
	name: "Disabled",
	args: {
		label: "Description",
		disabled: true,
		value: "This textarea is disabled",
	},
};

export const Readonly = {
	render: Template.bind({}),
	name: "Readonly",
	args: {
		label: "Description",
		readonly: true,
		value: "This textarea is readonly",
	},
};

export const CustomRows = {
	render: Template.bind({}),
	name: "Custom Rows",
	args: {
		label: "Long Description",
		rows: 10,
		placeholder: "Enter a longer description...",
	},
};


import React from "react";
import { Select } from "../../src";
import { CheckIcon, XMarkIcon, StarIcon } from "@heroicons/react/24/solid";

const iconOptions = Array.from(Array(20).keys()).map((key) => ({
	label: "Option " + key,
	value: key,
	disabled: key === 3,
	renderOption: (
		<span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
			{key % 3 === 0 && (
				<XMarkIcon
					className="w-4 h-4"
					aria-label="close icon"
					style={{ color: "#e74c3c" }}
				/>
			)}
			{key % 3 === 1 && (
				<CheckIcon
					className="w-4 h-4"
					aria-label="checkmark icon"
					style={{ color: "#27ae60" }}
				/>
			)}
			{key % 3 === 2 && (
				<StarIcon
					className="w-4 h-4"
					aria-label="star icon"
					style={{ color: "#f1c40f" }}
				/>
			)}
			<span>Option {key}</span>
		</span>
	),
}));

const Template = (args) => (
	<>
		<Select {...args} />
	</>
);

export default {
	title: "Forms/Select",
	component: Select,
	decorators: [
		(Story) => (
			<div style={{ height: "400px" }}>
				<Story />
			</div>
		),
	],
	args: {
		options: iconOptions,
		multi: false,
		searchable: false,
		clearable: false,
		disabled: false,
		readonly: false,
		error: false,
		errorMsg: "",
		label: "",
		placeholder: "Select option(s)",
		selectedLabel: "Selected option(s)",
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
		options: {
			control: "object",
			description:
				"Array of objects with label, value, disabled and optional renderOption properties",
		},
	},
};

export const SelectStory = {
	render: Template.bind({}),
	name: "Select",
	height: "400px",
};

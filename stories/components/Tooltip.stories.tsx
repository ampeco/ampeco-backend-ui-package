import React from "react";
import { Tooltip, TooltipPosition } from "../../src";
import { useState } from "react";
import { Shape } from "../../src/types/Shape";

const Template = (args) => {
	// const [isOpen, setIsOpen] = useState(false);
	return (
		<Tooltip
			{...args}
			// isOpen={isOpen}
		>
			{/* <div
				onMouseEnter={() => setIsOpen(true)}
				onMouseLeave={() => setIsOpen(false)}
			>
			</div> */}
			{args.children}
		</Tooltip>
	);
};

export default {
	title: "Components/Tooltip",
	component: Tooltip,
	decorators: [
		(Story) => (
			<div className="w-full h-[200px] flex items-center justify-center">
				<Story />
			</div>
		),
	],
	args: {
		message: "This is some additional information",
		children: <h4>Hover over text for aditional infomartion</h4>,
	},

	argTypes: {
		position: {
			control: "radio",
			options: [
				TooltipPosition.TOP,
				TooltipPosition.RIGHT,
				TooltipPosition.BOTTOM,
				TooltipPosition.LEFT,
			],
		},
		shape: {
			control: "radio",
			options: [Shape.DEFAULT, Shape.ROUNDED, Shape.SQUARE],
		},
		children: {
			description: "React element that shows tooltip on hover",
		},
	},
};

export const TooltipStory = {
	render: Template.bind({}),
	name: "Tooltip",
};
